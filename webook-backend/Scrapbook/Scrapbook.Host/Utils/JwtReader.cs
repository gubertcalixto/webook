using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Internal;

namespace Scrapbook.Host.Utils
{
    public class JwtReader: IJwtReader
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public JwtReader(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }
        
        public string GetJwtToken()
        {
            var token = _contextAccessor.HttpContext.Request.Headers["Authorization"];
            const string bearerPrefix = "Bearer ";
            if(string.IsNullOrEmpty(token) || !token.ToString().StartsWith(bearerPrefix))
                ThrowNotAuthenticatedError();
            return token.ToString().Split(bearerPrefix)[1];
        }

        public JwtSecurityToken GetJwtDecoded()
        {
            var token = GetJwtToken();
            var handler = new JwtSecurityTokenHandler();
            var jwtDecoded = handler.ReadJwtToken(token);
            if(jwtDecoded == null)
                ThrowNotAuthenticatedError();
            return jwtDecoded;
        }

        private void ThrowNotAuthenticatedError()
        {
            if (_contextAccessor.HttpContext.Response != null)
                _contextAccessor.HttpContext.Response.StatusCode = 401;
            throw new AuthenticationException("No JWT token found");
        }

        public string GetJwtClaim(string claimName)
        {
            if (string.IsNullOrEmpty(claimName))
                return null;
            var jwt = GetJwtDecoded();
            return jwt.Claims.FirstOrDefault(c => c.Type == claimName)?.Value;
        }

        public Guid GetUserId()
        {
            return Guid.Parse(GetJwtClaim("sub"));
        }
    }
}