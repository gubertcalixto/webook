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
        private DbSet<ApplicationUser> UserRepository => _userContext.ApplicationUsers;
        private readonly UserContext _userContext;

        public ResourceOwnerPasswordValidator(UserContext userContext)
        {
            _userContext = userContext;
        }

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {
                var user = await UserRepository
                    .FirstOrDefaultAsync(us =>
                        !us.IsDeleted &&
                        (us.Email == context.UserName ||
                         us.Login == context.UserName)
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
                    context.Result = new GrantValidationResult { IsError = true, Error = LogInStatus.UserInactive.ToString() };
                    return;
                }
                
                if (user.LockoutEnabled)
                {
                    if (user.LockoutEnd.HasValue && DateTimeOffset.Compare(DateTimeOffset.Now, user.LockoutEnd.Value) != 1)
                    {
                        context.Result = new GrantValidationResult { IsError = true, Error = LogInStatus.UserBlocked.ToString() };
                        return;
                    }
                    await ResetUserLockout(user);
                }
                
                var userPasswordHashed = PasswordManager.PasswordToHashBase64(context.Password, user.PasswordSalt);
                if (user.PasswordHash != userPasswordHashed) {
                    context.Result = new GrantValidationResult { IsError = true, Error = LogInStatus.IncorrectUserOrPassword.ToString()};
                    await IterateUserAccessFailedCount(user);
                    return;
                }
                await ResetUserLockout(user, true);

                context.Result = new GrantValidationResult(user.Id.ToString(), OidcConstants.AuthenticationMethods.Password);
            }
            catch (Exception)
            {
                context.Result = new GrantValidationResult { IsError = true, Error = LogInStatus.UnknownError.ToString() };
            }
        }

        private async Task ResetUserLockout(ApplicationUser user, bool resetAccessCount = false)
        {
            if (resetAccessCount)
                user.AccessFailedCount = 0;
            user.LockoutEnabled = false;
            user.LockoutEnd = null;
            UserRepository.Update(user);
            await _userContext.SaveChangesAsync();
        }

        private async Task IterateUserAccessFailedCount(ApplicationUser user)
        {
            user.AccessFailedCount++;
            if (user.AccessFailedCount > 3)
            {
                user.LockoutEnabled = true;
                user.LockoutEnd = GetLockoutEndDate(user.AccessFailedCount);
            }

            UserRepository.Update(user);
            await _userContext.SaveChangesAsync();
        }

        private static DateTimeOffset? GetLockoutEndDate(int userAccessFailedCount)
        {
            var dateOffset = DateTimeOffset.Now;
            if (userAccessFailedCount > 30)
                dateOffset = DateTimeOffset.Now.AddYears(1);
            if (userAccessFailedCount > 20)
                dateOffset = DateTimeOffset.Now.AddMonths(3);
            if (userAccessFailedCount > 10)
                dateOffset = DateTimeOffset.Now.AddMonths(1);
            else if (userAccessFailedCount > 7)
                dateOffset = DateTimeOffset.Now.AddDays(15);
            else if (userAccessFailedCount > 3)
                dateOffset = DateTimeOffset.Now.AddDays(1);
            return dateOffset;
        }
    }
}