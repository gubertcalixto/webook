using System;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer.Domain.Entities;
using IdentityServer.Domain.Utils;
using IdentityServer.IdentityServerConfig;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using IdentityServer4.Validation;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.IdentityControllers.Profile
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator 
    {
        private readonly DbSet<ApplicationUser> _userRepository;

        public ResourceOwnerPasswordValidator(UserContext userContext)
        {
            _userRepository = userContext.ApplicationUsers;
        }

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {
                var user = await _userRepository
                    .FirstOrDefaultAsync(us => 
                        us.Email == context.UserName ||
                        us.Login == context.UserName
                    );
                if (user == null)
                {
                    context.Result = new GrantValidationResult
                    {
                        IsError = true,
                        Error = LogInStatus.IncorrectUserOrPassword.ToString()
                    };
                    return;
                }
                
                if (!user.IsActive)
                {
                    context.Result = new GrantValidationResult 
                    {
                        IsError = true,
                        Error = LogInStatus.UserInactive.ToString()
                    };
                    return;
                }
                
                var userPasswordHashed = PasswordManager.PasswordToHashBase64(context.Password, user.PasswordSalt);
                
                if (user.PasswordHash != userPasswordHashed) {
                    context.Result = new GrantValidationResult { IsError = true, Error = LogInStatus.IncorrectUserOrPassword.ToString()};                
                    return;
                } 

                context.Result = new GrantValidationResult(user.Id.ToString(), OidcConstants.AuthenticationMethods.Password);
            }
            catch (Exception)
            {
                context.Result = new GrantValidationResult { IsError = true, Error = LogInStatus.UnknownError.ToString() };
            }
        }
    }
}