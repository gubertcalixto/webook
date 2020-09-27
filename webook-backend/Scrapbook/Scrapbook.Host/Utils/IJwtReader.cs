using System;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace Scrapbook.Host.Utils
{
    public interface IJwtReader
    {
        bool IsUserLoggedIn();
        string GetJwtToken(bool shouldThrowError = true);
        JwtSecurityToken GetJwtDecoded(bool shouldThrowError = true);
        string GetJwtClaim(string claimName, bool shouldThrowError = true);
        Guid GetUserId(bool shouldThrowError = true);
    }
}