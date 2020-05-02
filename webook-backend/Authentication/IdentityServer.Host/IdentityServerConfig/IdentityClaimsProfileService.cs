using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer.Domain.Entities;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.IdentityServerConfig
{
    public class IdentityClaimsProfileService : IProfileService
    {
        private readonly DbSet<ApplicationUser> _userRepository;

        public IdentityClaimsProfileService(UserContext userContext)
        {
            _userRepository = userContext.ApplicationUsers;
        }
        
        //Get user profile date in terms of claims when calling /connect/userinfo
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var userIdInitialClaim = context.Subject.Claims.FirstOrDefault(x => x.Type == IdentityClaims.Sub);

            if (!string.IsNullOrEmpty(userIdInitialClaim?.Value))
            {
                var userId = Guid.Parse(userIdInitialClaim.Value);
                var user = await _userRepository.FindAsync(userId);

                if (user != null)
                {
                    var userIdClaim = new Claim(IdentityClaims.UserId, user.Id.ToString());
                    var userNameClaim = new Claim(IdentityClaims.Name, user.UserName);
                    var userEmailClaim = new Claim(IdentityClaims.Email, user.Email);

                    context.IssuedClaims = context.Subject.Claims
                        .Where(claim => 
                            !string.Equals(claim.Type,IdentityClaims.AuthTime, StringComparison.OrdinalIgnoreCase) &&
                            !string.Equals(claim.Type,IdentityClaims.Name, StringComparison.OrdinalIgnoreCase)
                        ).ToList();

                    context.IssuedClaims[context.IssuedClaims.FindIndex(x => x.Type == IdentityClaims.UserId)] = userIdClaim;
                    context.IssuedClaims[context.IssuedClaims.FindIndex(x => x.Type == IdentityClaims.Name)] = userNameClaim;
                    context.IssuedClaims[context.IssuedClaims.FindIndex(x => x.Type == IdentityClaims.Email)] = userEmailClaim;
                }
            }
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var userIdClaim = context.Subject.Claims.First(x => x.Type == IdentityClaims.UserId);
            var userId = Guid.Parse(userIdClaim.Value);

            if (userId != Guid.Empty)
            {
                var user = await _userRepository.FindAsync(userId);

                if (user != null)
                {
                    context.IsActive = context.IsActive || user.IsActive;
                }
            }
        }
    }
}