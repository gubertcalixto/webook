using System.Collections.Generic;

namespace IdentityServer.IdentityServerConfig
{
    public static class IdentityDefaultUrls
    {
        // TODO: Set production URLs
        public static string AuthenticationUrl => "http://localhost:5000/";
        public static string LoginAppUrl => $"{LoginAppOrigin}/login";

        public static string LoginAppOrigin => "http://localhost:4201";
        public static string FrontendAppOrigin => "http://localhost:4200";
        private static string FrontendWildcardAppOrigin => "http://localhost:4200/*";
        public static ICollection<string> AllowedCorsOrigins => new []{LoginAppOrigin, FrontendWildcardAppOrigin};
        public static ICollection<string> AllowedPostLogoutRedirectUris => new []{LoginAppOrigin, FrontendWildcardAppOrigin};
        public static ICollection<string> AllowedRedirectUris => new []{LoginAppOrigin, FrontendWildcardAppOrigin};
    }
}