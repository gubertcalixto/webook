using System.Collections.Generic;

namespace IdentityServer.IdentityServerConfig
{
    public class IdentityDefaultUrls
    {
        public static ICollection<string> AllowedCorsOrigins => new []{"http://localhost:4200/*"};
        // TODO: Set production URL
        public static ICollection<string> AllowedCorsOriginsProduction => new []{"TODO"};
        
        public static ICollection<string> AllowedPostLogoutRedirectUris => new []{"http://localhost:4200/*"};
        // TODO: Set production URL
        public static ICollection<string> AllowedPostLogoutRedirectUrisProduction => new []{"TODO"};
        
        public static ICollection<string> AllowedRedirectUris => new []{"http://localhost:4200/*"};
        // TODO: Set production URL
        public static ICollection<string> AllowedRedirectUrisProduction => new []{"TODO"};
    }
}