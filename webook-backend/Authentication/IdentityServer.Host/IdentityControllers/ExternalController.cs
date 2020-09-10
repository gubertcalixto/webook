using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer.Domain.Dtos;
using IdentityServer.Domain.Entities;
using IdentityServer.IdentityServerConfig;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using IdentityServer4;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace IdentityServer.IdentityControllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ExternalController: Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly UserContext _context;
        private readonly DbSet<ApplicationUser> _userRepository;
        private readonly DbSet<ExternalAuthenticationLink> _externalAuthLinkRepository;
        private readonly IEventService _events;
        private readonly IGoogleExternalAuthenticationConfiguration _googleExternalAuthenticationConfiguration;

        public ExternalController(UserContext context, IGoogleExternalAuthenticationConfiguration googleExternalAuthenticationConfiguration, IEventService events)
        {
            _googleExternalAuthenticationConfiguration = googleExternalAuthenticationConfiguration;
            _events = events;
            _context = context;
            _userRepository = context.ApplicationUsers;
            _externalAuthLinkRepository = context.ExternalAuthenticationLinks;
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Challenge(string scheme = "", string returnUrl = "", string fallbackUrl = "", bool forceConsent = false)
        {
            // TODO: Production
            if (string.IsNullOrEmpty(returnUrl)) returnUrl = "http://localhost:4200";
            if (string.IsNullOrEmpty(fallbackUrl)) fallbackUrl = "/oauth/app/login";
            if (string.IsNullOrEmpty(scheme)) scheme = "Google";
            // TODO Remove clientId from her;
            var clientId = Encoding.UTF8.GetString(Convert.FromBase64String("NTA1MjAyNjgxNDkwLWhmMWE2ZDBoczF0dDgwcjExNW10YzhydHJvYmVrYWdpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t"));

            if (!await IsReturnUrlValid(returnUrl, fallbackUrl))
            {
                return Redirect($"{fallbackUrl}?errors=invalidRedirectUrl");
            }
            
            var scopes = "openid email profile";
            var props = new AuthenticationProperties
            {
                RedirectUri = Path.Combine($"/oauth{Url.Action(nameof(Callback))}?clientId={clientId}&addedScopes={scopes}&{nameof(fallbackUrl)}={fallbackUrl}"),
                Items =
                {
                    { "return_url", returnUrl }, 
                    { "scheme", scheme },
                    { "scope",  scopes},
                    { "response_type", "code" },
                    { "include_granted_scopes", "true"}
                }
            };

            // Force user to consent permissions
            if (forceConsent)
                props.Items.Add("prompt", "consent");

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
                fallbackUrl = "/oauth/app/login";
                var loggedUserId = GetAuthenticatedUserId();
                if (loggedUserId != null)
                    // TODO: Production
                    fallbackUrl = "http://localhost:4200";
            }

            if (result?.Succeeded != true)
                return Redirect($"{fallbackUrl}?errors=externalAuthenticationError");

            // Find user by External Provider
            var (user, provider, providerUserId, externalTokens, externalClaims) = await GetInfoFromExternalProvider(result);

            // User wasn't found
            if (user == null)
            {
                // TODO: Create User
            }
            
            if (externalTokens == null || !externalTokens.Any())
                return Redirect($"{fallbackUrl}" +
                                $"?errors=externalAuthenticationError");
            
            var externalLink = await CreateOrUpdateExternalLink(user, externalTokens, addedScopes);
            var returnUrl = result.Properties.Items["return_url"] ?? "http://localhost:4200";
            
            // Refresh Token wasn't save, forcing consent
            if (string.IsNullOrEmpty(externalLink?.RefreshToken))
            {
                var scheme = result.Properties.Items.FirstOrDefault(item => item.Key == "scheme").Value;
                return await Challenge(scheme, returnUrl, fallbackUrl, true);
            }

            // TODO: Testar
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
            if (externalLink.AccessTokenExpiresDate > DateTime.UtcNow.AddMinutes(10))
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
            var revokeUrl = $"https://oauth2.googleapis.com/revoke?token={externalLink.RefreshToken}";
            using (var client = new HttpClient())
            using (var response = await client.PostAsync(revokeUrl, null))
            {
                if (response?.StatusCode != HttpStatusCode.OK)
                    return Problem("Error in Google Api Request");
                _externalAuthLinkRepository.Remove(externalLink);
                await _context.SaveChangesAsync();
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

        private async Task<bool> IsReturnUrlValid(params string[] returnUrls)
        {
            var isUrlsValid = returnUrls.Any(r => !string.IsNullOrEmpty(r));
            if (!isUrlsValid)
                return false;

            // Add default redirect Urls
            // TODO: Production
            var redirectUris = new List<string>
            {
                "/oauth/app/login",
                "http://localhost:4200",
                "http://localhost:4200/*"
            };

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
            var accessToken = externalTokens.FirstOrDefault(x => x.Name == "access_token")?.Value;
            var refreshToken = externalTokens.FirstOrDefault(x => x.Name == "refresh_token")?.Value;
            var accessTokenExpiresDate = externalTokens.FirstOrDefault(x => x.Name == "expires_at")?.Value;
            var normalizedAccessTokenExpiresDate = string.IsNullOrEmpty(accessTokenExpiresDate)
                ? DateTime.UtcNow.AddMinutes(60)
                : DateTime.Parse(accessTokenExpiresDate).ToUniversalTime();
            if (externalLink == null)
            {
                externalLink = (await _externalAuthLinkRepository.AddAsync(new ExternalAuthenticationLink
                {
                    Id = Guid.NewGuid(),
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    UserId = user.Id,
                    AccessTokenExpiresDate = normalizedAccessTokenExpiresDate,
                })).Entity;
                await _context.SaveChangesAsync();
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
                new KeyValuePair<string, string>("client_id", _googleExternalAuthenticationConfiguration.ClientId),
                new KeyValuePair<string, string>("client_secret", _googleExternalAuthenticationConfiguration.ClientSecret),
                new KeyValuePair<string, string>("grant_type", IdentityServerConstants.PersistedGrantTypes.RefreshToken),
                new KeyValuePair<string, string>("refresh_token", refreshToken)
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

            var provider = result.Properties.Items["scheme"];
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
            var idToken = externalResult.Properties.GetTokenValue("id_token");
            if (idToken != null)
                localSignInProps.StoreTokens(new[] { new AuthenticationToken { Name = "id_token", Value = idToken } });
            
            // Add OUR custom claims
            localClaims.AddRange(new[]
            {
                new Claim(IdentityClaims.Email, user.Email),
                new Claim(IdentityClaims.FirstName, user.FirstName),
                new Claim(IdentityClaims.LastName, user.SecondName)
            });
        }

        private async Task<ExternalAuthenticationLink> GetExternalAuthLink(Guid userId)
        {
            if (userId == Guid.Empty)
                return null;
            return await _externalAuthLinkRepository.FirstOrDefaultAsync(u => u.UserId == userId);
        }
        
        private Guid? GetAuthenticatedUserId()
        {
            if (HttpContext.User == null)
                return null;
            return Guid.Parse(HttpContext.User.GetSubjectId());
        }
    }
}