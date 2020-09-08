using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using IdentityServer.Domain.Dtos.Mail;
using IdentityServer.Domain.Entities;
using IdentityServer.Domain.Utils;
using IdentityServer.IdentityControllers.Account.Dtos.ForgotPassword;
using IdentityServer.IdentityControllers.Account.Dtos.Login;
using IdentityServer.IdentityControllers.Account.Dtos.Logout;
using IdentityServer.IdentityControllers.Account.Dtos.Register;
using IdentityServer.IdentityServerConfig;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using IdentityServer.Services;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Utilities;

namespace IdentityServer.IdentityControllers.Account
{
    [ApiController]
    [Route("/[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly IResourceOwnerPasswordValidator _usersValidator;
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IEventService _events;
        private readonly IMapper _mapper;
        private readonly UserContext _userContext;
        private readonly IMailService _mailService;
        private readonly IMailTemplateService _mailTemplateService;
        private DbSet<ApplicationUser> UserRepository => _userContext.ApplicationUsers;
        private DbSet<ForgotPasswordInfo> ForgotPasswordInfoRepository => _userContext.ForgotPasswordInfos;

        public AccountController(UserContext userContext, IEventService events,
            IIdentityServerInteractionService interaction, IResourceOwnerPasswordValidator usersValidator,
            IMapper mapper, IMailService mailService, IMailTemplateService mailTemplateService)
        {
            _events = events;
            _interaction = interaction;
            _usersValidator = usersValidator;
            _mapper = mapper;
            _userContext = userContext;
            _mailService = mailService;
            _mailTemplateService = mailTemplateService;
        }
        
        [HttpPost]
        public async Task<RegisterOutput> Register([FromBody] RegisterInput input)
        {
            var conflictedUserStatus = await DoesUserExists(input);
            if (conflictedUserStatus == DoesUserExistsStatus.NotFound) return await TryInsertUser(input);
            
            return conflictedUserStatus == DoesUserExistsStatus.SameEmail
                ? new RegisterOutput { Result = RegisterOutputResult.EmailConflict}
                : new RegisterOutput { Result = RegisterOutputResult.LoginConflict};
        }

        private async Task<RegisterOutput> TryInsertUser(RegisterInput input)
        {
            var output = new RegisterOutput();
            var userToAdd = _mapper.Map<ApplicationUser>(input);
            PasswordManager.CreatePasswordSaltAndHash(input.Password, out var passwordSalt, out var passwordHash);
            userToAdd.PasswordSalt = passwordSalt;
            userToAdd.PasswordHash = passwordHash;
            var userSaved = await UserRepository.AddAsync(userToAdd);
            await _userContext.SaveChangesAsync();
            output.Result = RegisterOutputResult.Success;
            output.UserId = userSaved.Entity.Id;
            return output;
        }

        private async Task<DoesUserExistsStatus> DoesUserExists(RegisterInput input)
        {
            var conflictedUser = await UserRepository.FirstOrDefaultAsync(u =>
                u.IsDeleted == false &&  (u.Email == input.Email || u.Login == input.Login)
            );
            if (conflictedUser == null)
                return DoesUserExistsStatus.NotFound;
            if(conflictedUser.Email.Equals(input.Email))
                return DoesUserExistsStatus.SameEmail;
            
            return DoesUserExistsStatus.SameLogin;
        }

        [HttpGet]
        public RedirectResult Login(string returnUrl)
        {
            var url = IdentityDefaultUrls.LoginAppUrl + "?returnUrl=" + HttpUtility.UrlEncode("" + returnUrl);
            return Redirect(url);
        }

        [HttpPost]
        public async Task<IdentityLoginOutput> Login([FromBody] IdentityLoginInput model)
        {
            var userContext = new ResourceOwnerPasswordValidationContext
            {
                UserName = model.Login, 
                Password = model.Password
            };

            await _usersValidator.ValidateAsync(userContext);
            
            if (!userContext.Result.IsError)
            {
                await _events.RaiseAsync(new UserLoginSuccessEvent(model.Login, userContext.Result.Subject.ToString(), model.Login));

                // issue authentication cookie with subject ID and username
                var userId = userContext.Result.Subject.Claims.FirstOrDefault(x => x.Type == "sub");
                
                var user = UserRepository.FirstOrDefault(us => !us.IsDeleted && us.Id == Guid.Parse(userId.Value));
                
                if (user != null)
                {
                    var claims = new[]
                    {
                        new Claim(IdentityClaims.Email, user.Email),
                        new Claim(IdentityClaims.FirstName, user.FirstName),
                        new Claim(IdentityClaims.LastName, user.SecondName)
                    };

                    await HttpContext.SignInAsync(userId != null ? userId.Value : "", user.UserName, (AuthenticationProperties) null, claims);
                }

                return await Task.FromResult(new IdentityLoginOutput { LoginResult = LogInStatus.Validated });
            }

            await _events.RaiseAsync(new UserLoginFailureEvent(model.Login, "invalid credentials"));
            switch (Enum.Parse<LogInStatus>(userContext.Result.Error))
            {
                case LogInStatus.IncorrectUserOrPassword:
                case LogInStatus.UserInactive:
                case LogInStatus.UnknownError:
                case LogInStatus.UserBlocked:
                    return await Task.FromResult(new IdentityLoginOutput { LoginResult = Enum.Parse<LogInStatus>(userContext.Result.Error) });
                default:
                {
                    return await Task.FromResult(new IdentityLoginOutput
                    {
                        LoginResult = LogInStatus.UnknownError,
                        Message = userContext.Result.Error
                    });
                }
            }
        }
        
        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            return await Logout(new IdentityLogoutInput(logoutId));
        }

        [HttpPost]
        public async Task<IActionResult> Logout(IdentityLogoutInput model)
        {
            if (User?.Identity.IsAuthenticated == true)
            {
                await HttpContext.SignOutAsync();
                await _events.RaiseAsync(new UserLogoutSuccessEvent(User.GetSubjectId(), User.GetDisplayName()));
            }

            var logout = await _interaction.GetLogoutContextAsync(model.LogoutId);
            if (!string.IsNullOrEmpty(logout.PostLogoutRedirectUri))
                return Redirect(logout.PostLogoutRedirectUri);

            return Redirect(IdentityDefaultUrls.LoginAppUrl);
        }

        [HttpDelete]
        public async Task<bool> DeleteAccount()
        {
            // TODO: User is NEVER authentication
            if (User?.Identity.IsAuthenticated != true)
                return false;

            Guid.TryParse(User?.Identity.GetSubjectId(), out var userId);
            if(userId == Guid.Empty)
                return false;
            var user = await UserRepository.FirstAsync(u => u.Id == userId);
            user.IsDeleted = true;
            UserRepository.Update(user);
            await _userContext.SaveChangesAsync();
            return true;
        }
        
        [HttpPost]
        public async Task<bool> ForgotPassword([FromBody] ForgotPasswordInput passwordInput)
        {
            var user = UserRepository.FirstOrDefault(u => u.NormalizedEmail == Strings.ToUpperCase(passwordInput.Email));
            if (user == null) return false;

            if (await ForgotPasswordInfoRepository.AnyAsync(f => f.UserId == user.Id))
            {
                var infosToDelete = await ForgotPasswordInfoRepository.Where(f => f.UserId == user.Id).ToListAsync();
                ForgotPasswordInfoRepository.RemoveRange(infosToDelete);
                await _userContext.SaveChangesAsync();
            }

            var forgotPasswordInfo = new ForgotPasswordInfo
            {
                ExpirationTime = DateTime.Now.AddHours(48), // 2 dias
                UserId = user.Id,
                Hash = Guid.NewGuid().ToString()
            }; 
            await ForgotPasswordInfoRepository.AddAsync(forgotPasswordInfo);
            await _userContext.SaveChangesAsync();

            dynamic templateArgs = new JObject();
            templateArgs.PasswordHash = forgotPasswordInfo.Hash;
            EmailTemplate template = _mailTemplateService.GetTemplate("welcome", templateArgs);

            var request = new MailRequest
            {
                ToEmail = passwordInput.Email,
                Subject = template.Subject,
                Body = template.Body
            };

            try
            {
                await _mailService.SendEmailAsync(request);
                return true;
            }
            catch
            {
                return false;
            }
        }
        
        [HttpGet]
        public async Task<bool> DoesForgotPasswordInfoExists(string forgotHash)
        {
            return !string.IsNullOrEmpty(forgotHash)
                   && await ForgotPasswordInfoRepository.AnyAsync(f => f.Hash == forgotHash);
        }

        [HttpPost]
        public async Task<IActionResult> UpdatePassword([FromBody] ForgotPasswordInput input)
        {
            var forgotPasswordInfo = await ForgotPasswordInfoRepository
                .FirstOrDefaultAsync(f => f.Hash == input.Hash && f.ExpirationTime >= DateTime.Now);
            if (forgotPasswordInfo == null || forgotPasswordInfo.Hash != input.Hash) return NoContent();
            
            var user = await UserRepository.FindAsync(forgotPasswordInfo.UserId);
            if (user == null) return NoContent();
                
            PasswordManager.CreatePasswordSaltAndHash(input.Password, out var passwordSalt, out var passwordHash);
            user.PasswordSalt = passwordSalt;
            user.PasswordHash = passwordHash;
            UserRepository.Update(user);
            ForgotPasswordInfoRepository.Remove(forgotPasswordInfo);
            await _userContext.SaveChangesAsync();
            return Ok();
        }
    }
}