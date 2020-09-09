using IdentityModel;
using IdentityServer4;
using IdentityServer4.Events;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4.EntityFramework.Entities;
using IdentityServer4.EntityFramework.Interfaces;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Viasoft.Authentication.Domain.Consts;
using Viasoft.Authentication.Domain.Entities;
using Viasoft.Authentication.Domain.Model;
using Viasoft.Authentication.Host.Services;
using Viasoft.Authentication.Host.Services.IdentityServer.GoogleExternalAuth;
using Viasoft.Authentication.Infrastructure.Config;
using Viasoft.Core.DDD.Repositories;
using Viasoft.Core.Identity.Abstractions.Users;

namespace Viasoft.Authentication.Host.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ExternalController: Controller
    {
        private readonly IRepository<ApplicationUser> _userRepository;
        private readonly IRepository<ExternalAuthenticationLink> _externalAuthLinkRepository;
        private readonly DbSet<Client> _clientRepository;
        private readonly IEventService _events;
        private readonly ICurrentUser _currentUser;
        private readonly IGoogleExternalAuthenticationConfiguration _googleExternalAuthenticationConfiguration;

        public ExternalController(IEventService events, IRepository<ApplicationUser> userRepository, IConfigurationDbContext configurationDbContext, IRepository<ExternalAuthenticationLink> externalAuthLinkRepository, ICurrentUser currentUser, IGoogleExternalAuthenticationConfiguration googleExternalAuthenticationConfiguration)
        {
            _userRepository = userRepository;
            _externalAuthLinkRepository = externalAuthLinkRepository;
            _clientRepository = configurationDbContext.Clients;
            _events = events;
            _currentUser = currentUser;
            _googleExternalAuthenticationConfiguration = googleExternalAuthenticationConfiguration;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Challenge(string scheme = "", string returnUrl = "", string clientId = "", string customScopes = "", string fallbackUrl = "", bool forceConsent = false)
        {
            if (string.IsNullOrEmpty(returnUrl)) returnUrl = ExternalAuthenticationConsts.DefaultRedirectUrl;
            if (string.IsNullOrEmpty(fallbackUrl)) fallbackUrl = ExternalAuthenticationConsts.LoginBaseRedirectUrl;
            if (string.IsNullOrEmpty(scheme)) scheme = ExternalAuthenticationConsts.DefaultScheme;
            if (string.IsNullOrEmpty(clientId)) clientId = ExternalAuthenticationConsts.DefaultKorpClientId;

            if (!ExternalAuthenticationConsts.GoogleExternalAuth.IsSignInEnabled())
            {
                var userId = GetAuthenticatedUserId();
                if (userId == null || userId.Value == Guid.Empty)
                    return BadRequest($"Argument Exception: {nameof(userId)}");
            }

            if (!await IsReturnUrlValid(clientId, returnUrl, fallbackUrl))
            {
                return Redirect($"{fallbackUrl}" +
                                $"?{ExternalAuthenticationConsts.LoginErrors.ParamKey}={ExternalAuthenticationConsts.LoginErrors.InvalidReturnUrlError}" +
                                $"&{ExternalAuthenticationConsts.LoginExternalProviderParamKey}={scheme}");
            }
            
            var scopes = GetChallengeScopes(customScopes);
            var props = new AuthenticationProperties
            {
                RedirectUri = Path.Combine($"/oauth{Url.Action(nameof(Callback))}?clientId={clientId}&addedScopes={scopes}&{nameof(fallbackUrl)}={fallbackUrl}"),
                Items =
                {
                    { ClaimsConsts.ReturnUrl, returnUrl }, 
                    { ClaimsConsts.Scheme, scheme },
                    { ClaimsConsts.Scope, scopes },
                    { ClaimsConsts.ResponseType, "code" },
                    { ClaimsConsts.IncludeGrantedScopes, "true"}
                }
            };

            // Force user to consent permissions
            if (forceConsent)
                props.Items.Add(ClaimsConsts.Prompt, "consent");

            return Challenge(props, scheme);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult AccessDeniedCallback(string returnUrl)
        {
            // External Authentication returns default callback url 
            if (string.IsNullOrEmpty(returnUrl))
                returnUrl = $"/oauth{Url.Action(nameof(Callback))}";
            return Redirect(returnUrl);
        }
        
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Callback(string clientId, string addedScopes, string fallbackUrl)
        {
            // read external identity from the temporary cookie
            var result = await HttpContext.AuthenticateAsync(IdentityServerConstants.ExternalCookieAuthenticationScheme);

            if (string.IsNullOrEmpty(fallbackUrl))
            {
                fallbackUrl = ExternalAuthenticationConsts.LoginBaseRedirectUrl;
                var loggedUserId = GetAuthenticatedUserId();
                if (loggedUserId != null)
                    fallbackUrl = ExternalAuthenticationConsts.DefaultRedirectUrl;
            }

            if (result?.Succeeded != true)
                return Redirect($"{fallbackUrl}" +
                                $"?{ExternalAuthenticationConsts.LoginErrors.ParamKey}={ExternalAuthenticationConsts.LoginErrors.ExternalAuthenticationError}");

            // Find user by External Provider
            var (user, provider, providerUserId, externalTokens, externalClaims) = await GetInfoFromExternalProvider(result);

            // User wasn't found
            if (user == null)
                return Redirect($"{fallbackUrl}" +
                                $"?{ExternalAuthenticationConsts.LoginErrors.ParamKey}={ExternalAuthenticationConsts.LoginErrors.NoKorpAccountError}" +
                                $"&{ExternalAuthenticationConsts.LoginExternalProviderParamKey}={provider}");
            
            if (externalTokens == null || !externalTokens.Any())
                return Redirect($"{fallbackUrl}" +
                                $"?{ExternalAuthenticationConsts.LoginErrors.ParamKey}={ExternalAuthenticationConsts.LoginErrors.ExternalAuthenticationError}" +
                                $"&{ExternalAuthenticationConsts.LoginExternalProviderParamKey}={provider}");
            
            var externalLink = await CreateOrUpdateExternalLink(user, externalTokens, addedScopes);
            var returnUrl = result.Properties.Items[ClaimsConsts.ReturnUrl] ?? ExternalAuthenticationConsts.DefaultRedirectUrl;
            
            // Refresh Token wasn't save, forcing consent
            if (string.IsNullOrEmpty(externalLink?.RefreshToken))
            {
                var scheme = result.Properties.Items.FirstOrDefault(item => item.Key == ClaimsConsts.Scheme).Value;
                return await Challenge(scheme, returnUrl, clientId, externalLink?.Scopes, fallbackUrl, true);
            }

            if (ExternalAuthenticationConsts.GoogleExternalAuth.IsSignInEnabled())
                await LoginWithExternalAuth(result, user, provider, providerUserId);

            // Delete temporary cookie used during external authentication
            await HttpContext.SignOutAsync(IdentityServerConstants.ExternalCookieAuthenticationScheme);
            return Redirect(returnUrl);
        }

        [HttpGet]
        public async Task<IActionResult> GetAccessToken()
        {
            var userId = GetAuthenticatedUserId();
            if (userId == null || userId.Value == Guid.Empty)
                return BadRequest($"Argument Exception: {nameof(userId)}");
            
            var externalLink = await GetExternalAuthLink(userId.Value);
            if (externalLink == null)
                return Ok(null);
            if (externalLink.AccessTokenExpiresDate > DateTime.UtcNow.AddMinutes(ExternalAuthenticationConsts.GoogleExternalAuth.RefreshClockSkew))
                return Ok(externalLink.AccessToken);
            
            return Ok((await UpdateExternalAccessToken(externalLink.RefreshToken, externalLink))?.AccessToken); 
        }
        
        [HttpGet]
        public async Task<IActionResult> UpdateExternalAccessToken()
        {
            var userId = GetAuthenticatedUserId();
            if (userId == null || userId.Value == Guid.Empty)
                return BadRequest($"Argument Exception: {nameof(userId)}");
            
            var externalLink = await GetExternalAuthLink(userId.Value);
            if (string.IsNullOrEmpty(externalLink?.RefreshToken))
                return BadRequest("User has no external authentication");
            return Ok((await UpdateExternalAccessToken(externalLink.RefreshToken, externalLink))?.AccessToken);
        }
        
        [HttpGet]
        public async Task<IActionResult> RevokeExternalAuthenticationToken()
        {
            var userId = GetAuthenticatedUserId();
            if (userId == null || userId.Value == Guid.Empty)
                return BadRequest($"Argument Exception: {nameof(userId)}");
            var externalLink = await GetExternalAuthLink(userId.Value);
            if(externalLink == null)
                return BadRequest("User has no external authentication");
            var revokeUrl = $"{ExternalAuthenticationConsts.GoogleExternalAuth.RevokeTokenEndpoint}?token={externalLink.RefreshToken}";
            using (var client = new HttpClient())
            using (var response = await client.PostAsync(revokeUrl, null))
            {
                if (response?.StatusCode != HttpStatusCode.OK)
                    return Problem("Error in Google Api Request");
                await _externalAuthLinkRepository.DeleteAsync(externalLink);
                return Ok();
            }
        }
        
        [HttpGet]
        public async Task<IActionResult> HasExternalLink()
        {
            var userId = GetAuthenticatedUserId();
            if (userId == null || userId.Value == Guid.Empty)
                return BadRequest($"Argument Exception: {nameof(userId)}");
            
            var hasExternalLink = await _externalAuthLinkRepository.AnyAsync(u => u.UserId == userId);
            return Ok(hasExternalLink);
        }

        [HttpGet]
        public async Task<IActionResult> GetScopes()
        {
            var userId = GetAuthenticatedUserId();
            if (userId == null || userId.Value == Guid.Empty)
                return BadRequest($"Argument Exception: {nameof(userId)}");
            
            var externalLink = await GetExternalAuthLink(userId.Value);
            if (externalLink == null)
                return NoContent();

            return Ok(externalLink.Scopes.Split(" "));
        }
        
        [HttpGet]
        public async Task<IActionResult> HasScope(string scope)
        {
            if (string.IsNullOrEmpty(scope))
                return BadRequest($"Argument Exception: {nameof(scope)}");
            var userId = GetAuthenticatedUserId();
            if (userId == null || userId.Value == Guid.Empty)
                return BadRequest($"Argument Exception: {nameof(userId)}");
            
            var externalLink = await GetExternalAuthLink(userId.Value);
            if (externalLink == null)
                return NoContent();

            var scopes = externalLink.Scopes.Split(" ");
            return Ok(scopes.Any(s => s.Equals(scope)));
        }

        private async Task LoginWithExternalAuth(AuthenticateResult result, ApplicationUser user, string provider, string providerUserId)
        {
            // Add custom claims (some needed for signout)
            var claims = new List<Claim>();
            var signInProps = new AuthenticationProperties();
            AppendLoginClaims(result, claims, signInProps, user);
            // issue authentication cookie for user
            var identityServerUser = new IdentityServerUser(user.Id.ToString())
            {
                DisplayName = $"{user.FirstName} {user.SecondName}", IdentityProvider = provider, AdditionalClaims = claims
            };
            await _events.RaiseAsync(new UserLoginSuccessEvent(provider, providerUserId, result.Principal.ToString(),
                user.Email));
            await HttpContext.SignInAsync(identityServerUser, signInProps);
        }
        
        private string GetChallengeScopes(string customScopes)
        {
            var defaultScopes = _googleExternalAuthenticationConfiguration.DefaultScopes;
            var scopes = defaultScopes.ToList();
            if (!string.IsNullOrEmpty(customScopes))
                scopes.AddRange(customScopes.Split(" "));
            ExternalAuthenticationConsts.ReplaceFullNamedScopes(scopes);

            if (scopes.Any(s => !_googleExternalAuthenticationConfiguration.AllowedScopes.Contains(s)))
                throw new Exception("Not Allowed scopes added");
            
            return string.Join(' ', scopes.Distinct().ToArray());
        }

        private async Task<bool> IsReturnUrlValid(string clientId, params string[] returnUrls)
        {
            var isUrlsValid = returnUrls.Any(r => !string.IsNullOrEmpty(r));
            if (!isUrlsValid)
                return false;

            var redirectUris = await (from c in _clientRepository
                where c.ClientId == clientId && c.Enabled
                select c.RedirectUris).SelectMany(list => list).Select(uri => uri.RedirectUri).Distinct().ToListAsync();
            
            // Add default redirect Urls
            redirectUris.Add(ExternalAuthenticationConsts.LoginBaseRedirectUrl);
            redirectUris.Add(ExternalAuthenticationConsts.DefaultRedirectUrl);
                
            foreach (var returnUrl in returnUrls)
            {
                var isValid = false; 
                foreach (var clientRedirectUri in redirectUris)
                {
                    // length - 2: Removes from substring /*
                    if (clientRedirectUri.EndsWith("/*"))
                        isValid = returnUrl.StartsWith(clientRedirectUri.Substring(0, clientRedirectUri.Length - 2));
                    else
                        isValid = clientRedirectUri == returnUrl;
                    
                    if(isValid)
                        break;
                }

                if (isValid) continue;
                
                isUrlsValid = false;
                break;
            }

            return isUrlsValid;
        }
        
        private async Task<ExternalAuthenticationLink> CreateOrUpdateExternalLink(ApplicationUser user,
            IReadOnlyCollection<AuthenticationToken> externalTokens, string scopes)
        {
            var externalLink = await GetExternalAuthLink(user.Id);
            var accessToken = externalTokens.FirstOrDefault(x => x.Name == ClaimsConsts.AccessToken)?.Value;
            var refreshToken = externalTokens.FirstOrDefault(x => x.Name == ClaimsConsts.RefreshToken)?.Value;
            var accessTokenExpiresDate = externalTokens.FirstOrDefault(x => x.Name == ClaimsConsts.ExpiresAt)?.Value;
            var normalizedAccessTokenExpiresDate = string.IsNullOrEmpty(accessTokenExpiresDate)
                ? DateTime.UtcNow.AddMinutes(ExternalAuthenticationConsts.GoogleExternalAuth.DefaultAccessTokenDuration)
                : DateTime.Parse(accessTokenExpiresDate).ToUniversalTime();
            if (externalLink == null)
            {
                externalLink = await _externalAuthLinkRepository.InsertAsync(new ExternalAuthenticationLink
                {
                    Id = Guid.NewGuid(),
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    UserId = user.Id,
                    AccessTokenExpiresDate = normalizedAccessTokenExpiresDate,
                    Scopes = GetChallengeScopes(scopes)
                });
            }
            else
                UpdateExternalAuthLink(externalLink, accessToken, normalizedAccessTokenExpiresDate, scopes, refreshToken);

            return externalLink;
        }
        
        private async Task<ExternalAuthenticationAccessTokenUpdateResponse> UpdateExternalAccessToken(string refreshToken, ExternalAuthenticationLink externalAuthenticationLink)
        {
            if (string.IsNullOrEmpty(refreshToken))
                throw new ArgumentException(nameof(refreshToken));
            
            var httpContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>(ClaimsConsts.ClientId, _googleExternalAuthenticationConfiguration.ClientId),
                new KeyValuePair<string, string>(ClaimsConsts.ClientSecret, _googleExternalAuthenticationConfiguration.ClientSecret),
                new KeyValuePair<string, string>(ClaimsConsts.GrantType, IdentityServerConstants.PersistedGrantTypes.RefreshToken),
                new KeyValuePair<string, string>(ClaimsConsts.RefreshToken, refreshToken)
            });

            ExternalAuthenticationAccessTokenUpdateResponse refreshResponse = null;
            using (var client = new HttpClient())
            using (var response = await client.PostAsync(GoogleDefaults.TokenEndpoint, httpContent))
            {
                if (response?.StatusCode != HttpStatusCode.OK)
                    throw new Exception("Refresh Access Token request failed. User token might be invalid");
                var responseAsString = await response.Content.ReadAsStringAsync();
                if(!string.IsNullOrEmpty(responseAsString))
                    refreshResponse = JsonConvert.DeserializeObject<ExternalAuthenticationAccessTokenUpdateResponse>(responseAsString);
            }

            if (refreshResponse?.AccessToken == null)
                throw new Exception("Refresh Access Token request failed. User token might be invalid");
            
            var expires = DateTime.UtcNow.AddSeconds(refreshResponse.ExpiresIn);
            UpdateExternalAuthLink(externalAuthenticationLink, refreshResponse.AccessToken, expires);
            return refreshResponse;
        }

        private void UpdateExternalAuthLink(ExternalAuthenticationLink externalAuthenticationLink,
            string accessToken, DateTime expiresDate, string scopesToAdd = null, string refreshToken = null)
        {
            if (externalAuthenticationLink == null || string.IsNullOrEmpty(accessToken)) return;
            externalAuthenticationLink.AccessToken = accessToken;
            externalAuthenticationLink.AccessTokenExpiresDate = expiresDate;
            if (!string.IsNullOrEmpty(refreshToken))
                externalAuthenticationLink.RefreshToken = refreshToken;
            
            var scopes = externalAuthenticationLink.Scopes?.Split(" ").ToList() ?? new List<string>();
            scopes.AddRange(GetChallengeScopes(scopesToAdd).Split(" "));
            externalAuthenticationLink.Scopes = string.Join(" ", scopes.Distinct());
        }

        private async Task<(ApplicationUser user, string provider, string providerUserId, List<AuthenticationToken> tokens, IEnumerable<Claim> claims)> GetInfoFromExternalProvider(AuthenticateResult result)
        {
            var externalUser = result.Principal;

            // try to determine the unique id of the external user (issued by the provider)
            // the most common claim type for that are the sub claim and the NameIdentifier
            // depending on the external provider, some other claim type might be used
            var userIdClaim = externalUser.FindFirst(JwtClaimTypes.Subject) ??
                              externalUser.FindFirst(ClaimTypes.NameIdentifier) ??
                              throw new Exception("Unknown userid");
            
            // remove the user id claim so we don't include it as an extra claim if/when we provision the user
            var claims = externalUser.Claims.ToList();
            claims.Remove(userIdClaim);

            var provider = result.Properties.Items[ClaimsConsts.Scheme];
            var providerUserId = userIdClaim.Value;
            
            var loggedUserId = GetAuthenticatedUserId();
            var user = await _userRepository
                .FirstOrDefaultAsync(u => u.Id == loggedUserId);

            return (user, provider, providerUserId, result.Properties.GetTokens().ToList(), claims);
        }
        
        private void AppendLoginClaims(AuthenticateResult externalResult, List<Claim> localClaims, AuthenticationProperties localSignInProps, ApplicationUser user)
        {
            // Needed for signout
            var sid = externalResult.Principal.Claims.FirstOrDefault(x => x.Type == JwtClaimTypes.SessionId);
            if (sid != null)
                localClaims.Add(new Claim(JwtClaimTypes.SessionId, sid.Value));

            // Needed for signout
            var idToken = externalResult.Properties.GetTokenValue(ClaimsConsts.IdToken);
            if (idToken != null)
                localSignInProps.StoreTokens(new[] { new AuthenticationToken { Name = ClaimsConsts.IdToken, Value = idToken } });
            
            // Add OUR custom claims
            localClaims.AddRange(CustomClaimsManagerService.GetCustomClaims(user));
        }

        private async Task<ExternalAuthenticationLink> GetExternalAuthLink(Guid userId)
        {
            if (userId == Guid.Empty)
                return null;
            return await _externalAuthLinkRepository.FirstOrDefaultAsync(u => u.UserId == userId);
        }
        
        private Guid? GetAuthenticatedUserId()
        {
            if (_currentUser.User?.Id == null || _currentUser.User.Id == Guid.Empty)
                return null;
            return _currentUser.User.Id;
        }
    }
}