using System;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace Scrapbook.Host.Utils
{
    public interface IJwtReader
    {
        string GetJwtToken();
        JwtSecurityToken GetJwtDecoded();
        string GetJwtClaim(string claimName);
        Guid GetUserId();
    }
}