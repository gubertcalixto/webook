using System.Collections.Generic;

namespace IdentityServer.IdentityServerConfig
{
    public class IdentityDefaultUrls
    {
        // TODO: Set production URLs
        public static string AuthenticationUrl => "http://localhost:5000/";
        public static string LoginAppUrl => AuthenticationUrl + "app/";

        public static ICollection<string> AllowedCorsOrigins => new []{"http://localhost:4200/*"};
        public static ICollection<string> AllowedPostLogoutRedirectUris => new []{"http://localhost:4200/*"};
        public static ICollection<string> AllowedRedirectUris => new []{"http://localhost:4200/*"};
    }
}