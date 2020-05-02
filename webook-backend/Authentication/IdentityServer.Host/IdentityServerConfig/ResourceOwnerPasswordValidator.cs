using System;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer.Domain.Entities;
using IdentityServer.Domain.Utils;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using IdentityServer4.Validation;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.IdentityServerConfig
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
                    .FirstOrDefaultAsync(us => us.Login == context.UserName || us.Email == context.UserName);
                if (user == null)
                {
                    context.Result = GetGrantErrorResult(LogInStatus.IncorrectUserOrPassword);
                    return;
                }
                
                if (!user.IsActive)
                {
                    context.Result = GetGrantErrorResult(LogInStatus.UserInactive);
                    return;
                }
                
                var userPasswordHashed = PasswordManager.PasswordToHashBase64(context.Password, user.PasswordSalt);
                
                if (user.PasswordHash != userPasswordHashed) {
                    context.Result =  GetGrantErrorResult(LogInStatus.IncorrectUserOrPassword);
                    return;
                } 

                context.Result = new GrantValidationResult(user.Id.ToString(), OidcConstants.AuthenticationMethods.Password);
            }
            catch (Exception)
            {
                context.Result =  GetGrantErrorResult(LogInStatus.UnknownError);
            }
        }

        private static GrantValidationResult GetGrantErrorResult(LogInStatus status)
        {
            return new GrantValidationResult { IsError = true, Error = status.ToString() };
        }
    }
}