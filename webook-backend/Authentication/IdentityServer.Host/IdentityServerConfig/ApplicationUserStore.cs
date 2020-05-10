using System;
using System.Threading;
using System.Threading.Tasks;
using IdentityServer.Domain.Entities;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.IdentityServerConfig
{
    public class ApplicationUserStore: IUserEmailStore<ApplicationUser>
    {
        private readonly UserContext _userContext;
        private DbSet<ApplicationUser> UserRepository => _userContext.ApplicationUsers;
        
        public ApplicationUserStore(UserContext userContext)
        {
            _userContext = userContext;
        }
        
        public void Dispose()
        {
            _userContext.Dispose();
        }

        public async Task<IdentityResult> CreateAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            try
            {
                await UserRepository.AddAsync(user, cancellationToken);
                await _userContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception)
            {
                return IdentityResult.Failed();
            }
            return IdentityResult.Success;
        }

        public async Task<IdentityResult> DeleteAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            try
            {
                UserRepository.Remove(user);
                await _userContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception)
            {
                return IdentityResult.Failed();
            }
            return IdentityResult.Success;
        }

        public async Task<ApplicationUser> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            return await UserRepository.FindAsync(userId, cancellationToken);
        }

        public async Task<ApplicationUser> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            return await UserRepository.FirstOrDefaultAsync(u => u.NormalizedUserName == normalizedUserName, cancellationToken);
        }

        public Task<string> GetNormalizedUserNameAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedEmail);
        }

        public Task<string> GetUserIdAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Id.ToString());
        }

        public Task<string> GetUserNameAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.UserName);
        }

        public Task SetNormalizedUserNameAsync(ApplicationUser user, string normalizedName, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedUserName);
        }

        public async Task SetUserNameAsync(ApplicationUser user, string userName, CancellationToken cancellationToken)
        {
            user.UserName = userName;
            user.NormalizedUserName = user.UserName.ToUpper();
            UserRepository.Update(user);
            await _userContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            try
            {
                UserRepository.Update(user);
                await _userContext.SaveChangesAsync(cancellationToken);
            }
            catch (Exception)
            {
                return IdentityResult.Failed();
            }
            return IdentityResult.Success;
        }

        public async Task<ApplicationUser> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            return await UserRepository.FirstOrDefaultAsync(u => u.NormalizedEmail == normalizedEmail, cancellationToken);
        }

        public Task<string> GetEmailAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Email);
        }

        public Task<bool> GetEmailConfirmedAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.EmailConfirmed);
        }

        public Task<string> GetNormalizedEmailAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedEmail);
        }

        public async Task SetEmailAsync(ApplicationUser user, string email, CancellationToken cancellationToken)
        {
            user.Email = email;
            user.NormalizedEmail = user.Email.ToUpper();
            UserRepository.Update(user);
            await _userContext.SaveChangesAsync(cancellationToken);
        }

        public async Task SetEmailConfirmedAsync(ApplicationUser user, bool confirmed, CancellationToken cancellationToken)
        {
            user.EmailConfirmed = confirmed;
            UserRepository.Update(user);
            await _userContext.SaveChangesAsync(cancellationToken);
        }

        public async Task SetNormalizedEmailAsync(ApplicationUser user, string normalizedEmail, CancellationToken cancellationToken)
        {
            user.NormalizedEmail = normalizedEmail;
            UserRepository.Update(user);
            await _userContext.SaveChangesAsync(cancellationToken);
        }
    }
}