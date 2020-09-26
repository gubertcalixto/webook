using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace IdentityServer.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        
        public CurrentUserService(IHttpContextAccessor  contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public Guid? GetCurrentUserId()
        {
            if (_contextAccessor?.HttpContext?.Request?.Headers == null)
                return null;
            
            var authenticationBearer = _contextAccessor.HttpContext.Request.Headers.ToList().FirstOrDefault(h => h.Key == "Authorization").Value.ToString();
            if (string.IsNullOrEmpty(authenticationBearer) || authenticationBearer.Split("Bearer ").Length != 2)
                return null;
            var authCode = authenticationBearer.Split("Bearer ")[1];
            var handler = new JwtSecurityTokenHandler();
            var tokenS = (JwtSecurityToken)handler.ReadToken(authCode);

            if (tokenS == null)
                return null;
            Guid.TryParse(tokenS.Subject, out var userId);
            return userId;
        }
    }
}