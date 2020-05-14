using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using IdentityServer.Domain.Entities;
using IdentityServer.Domain.Utils;
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
        private readonly IMapper _mapper;
        private readonly UserContext _userContext;
        private DbSet<ApplicationUser> UserRepository => _userContext.ApplicationUsers;

        public AccountController(UserContext userContext, IEventService events, IIdentityServerInteractionService interaction, IResourceOwnerPasswordValidator usersValidator, IMapper mapper)
        {
            _events = events;
            _interaction = interaction;
            _usersValidator = usersValidator;
            _mapper = mapper;
            _userContext = userContext;
        }
        
        [HttpPost]
        public async Task<RegisterOutput> Register([FromBody] RegisterInput input)
        {
            var doesUserExists = await DoesUserExists(input);
            if (doesUserExists)
                return new RegisterOutput { Result = RegisterOutputResult.UserAlreadyExists};

            return await TryInsertUser(input);
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

        private async Task<bool> DoesUserExists(RegisterInput input)
        {
            var doesUserExists = await UserRepository.AnyAsync(u =>
                u.IsDeleted == false &&
                (u.Email == input.Email || u.Login == input.Login)
            );
            return doesUserExists;
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
                
                var user = UserRepository.FirstOrDefault(us => us.Id == Guid.Parse(userId.Value));
                
                if (user != null)
                {
                    var claims = new[]
                    {
                        new Claim(IdentityClaims.Name, user.UserName),
                        new Claim(IdentityClaims.Email, user.Email)
                    };

                    await HttpContext.SignInAsync(userId != null ? userId.Value : "", model.Login, (AuthenticationProperties) null, claims);
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