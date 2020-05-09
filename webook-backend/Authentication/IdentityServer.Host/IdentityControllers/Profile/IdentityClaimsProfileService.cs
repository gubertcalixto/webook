using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer.Domain.Entities;
using IdentityServer.IdentityServerConfig;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.IdentityControllers.Profile
{
    public class IdentityClaimsProfileService : IProfileService
    {
        private readonly DbSet<ApplicationUser> _userRepository;
    
        public IdentityClaimsProfileService(UserContext userContext)
        {
            _userRepository = userContext.ApplicationUsers;
        }

        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var userId = context.Subject.Claims.FirstOrDefault(x => x.Type == "sub");
            if (string.IsNullOrEmpty(userId?.Value)) return Task.CompletedTask;
            
            var user = _userRepository
                .Select(u => new {u.Id, u.UserName})
                .FirstOrDefault(us => us.Id == Guid.Parse(userId.Value));
            if (user == null) return Task.CompletedTask;
            
            var userIdClaim = new Claim(IdentityClaims.UserId, user.Id.ToString());
            var userName = new Claim(IdentityClaims.Name, user.UserName);

            context.IssuedClaims = context.Subject.Claims
                .Where(x => 
                    !string.Equals(x.Type,IdentityClaims.AuthTime, StringComparison.OrdinalIgnoreCase) &&
                    !string.Equals(x.Type,IdentityClaims.Name, StringComparison.OrdinalIgnoreCase)
                ).ToList();

            context.IssuedClaims[context.IssuedClaims.FindIndex(x => x.Type == IdentityClaims.UserId)] = userIdClaim;
            context.IssuedClaims[context.IssuedClaims.FindIndex(x => x.Type == IdentityClaims.Name)] = userName;
            return Task.CompletedTask;
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            var userId = context.Subject.Claims.First(x => x.Type == IdentityClaims.UserId);

            if (!string.IsNullOrEmpty(userId?.Value) && long.Parse(userId.Value) > 0)
            {
                var user = _userRepository.FirstOrDefault(us => us.Id == Guid.Parse(userId.Value));

                if (user?.IsActive != null && user.IsActive)
                {
                    context.IsActive = user.IsActive;
                }
            }
            return Task.CompletedTask;
        }
    }
    
}