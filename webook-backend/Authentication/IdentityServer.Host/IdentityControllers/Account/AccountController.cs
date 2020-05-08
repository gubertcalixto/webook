using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using IdentityServer.Domain.Entities;
using IdentityServer.IdentityControllers.Account.Dtos.Login;
using IdentityServer.IdentityControllers.Account.Dtos.Logout;
using IdentityServer.IdentityControllers.Account.Dtos.Register;
using IdentityServer.IdentityServerConfig;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.IdentityControllers.Account
{
    [ApiController]
    [Route("/[controller]/[action]")]
    public class AccountController: ControllerBase
    {
        private readonly IResourceOwnerPasswordValidator _usersValidator;
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IEventService _events;
        private readonly DbSet<ApplicationUser> _userRepository;

        public AccountController(UserContext userContext, IEventService events, IIdentityServerInteractionService interaction, IResourceOwnerPasswordValidator usersValidator)
        {
            _events = events;
            _interaction = interaction;
            _usersValidator = usersValidator;
            _userRepository = userContext.ApplicationUsers;
        }
        
        [HttpPost]
        public async Task<RegisterOutput> Register([FromBody] RegisterInput input)
        {
            var doesUserExists = await _userRepository.AnyAsync(u => u.Email == input.Email);
            if (doesUserExists)
            {
                return new RegisterOutput
                {
                    Result = RegisterOutputResult.UserAlreadyExists
                };
            }

            var output = new RegisterOutput();
            // TODO Map user
            // TODO Create user
            return output;
        }

        [HttpGet]
        public RedirectResult Login(string returnUrl)
        {
            return Redirect(IdentityDefaultUrls.LoginAppUrl + "login?returnUrl=" + HttpUtility.UrlEncode("" + returnUrl) );
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
                
                var user = _userRepository.FirstOrDefault(us => us.Id == Guid.Parse(userId.Value));
                
                if (user != null)
                {
                    var claims = new[]
                    {
                        new Claim(IdentityClaims.UserId, user.Id.ToString()),
                        new Claim(IdentityClaims.Name, user.UserName),
                        new Claim(IdentityClaims.Email, user.Email)
                    };

                    await HttpContext.SignInAsync(userId != null ? userId.Value : "", model.Login, (AuthenticationProperties) null, claims);
                }

                // TODO: block user

                return await Task.FromResult(new IdentityLoginOutput { LoginResult = LogInStatus.Validated });
            }

            await _events.RaiseAsync(new UserLoginFailureEvent(model.Login, "invalid credentials"));
            switch (Enum.Parse<LogInStatus>(userContext.Result.Error))
            {
                case LogInStatus.IncorrectUserOrPassword:
                case LogInStatus.UserInactive:
                case LogInStatus.UnknownError:
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
        
        // TODO CHECK IF IS NECESSARY
        [HttpGet]
        public async Task<IActionResult> Logout(string logoutId)
        {
            return await Logout(new IdentityLogoutInput(logoutId));
        }

        [HttpPost]
        public async Task<IActionResult> Logout(IdentityLogoutInput  model)
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
    }
}