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
            
            context.IssuedClaims = context.Subject.Claims.ToList();
            return Task.CompletedTask;
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            var userId = context.Subject.Claims.First(x => x.Type == IdentityClaims.Sub);

            if (string.IsNullOrEmpty(userId?.Value) || Guid.Parse(userId.Value) == Guid.Empty)
                return Task.CompletedTask;
            
            var user = _userRepository.FirstOrDefault(us => us.Id == Guid.Parse(userId.Value));

            if (user?.IsActive != null && user.IsActive)
            {
                context.IsActive = user.IsActive;
            }
            return Task.CompletedTask;
        }
    }
    
}