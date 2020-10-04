using System.Collections.Generic;

namespace IdentityServer.IdentityServerConfig
{
    public static class IdentityDefaultUrls
    {
        // TODO: Set production URLs
        public static string LoginAppUrl => $"{AuthenticationOrigin}/login";

        public static string AuthenticationOrigin => "http://localhost:5000";
        public static string FrontendAppOrigin => "http://localhost:4200";
        public static string FrontendWildcardAppOrigin => "http://localhost:4200/*";
        public static ICollection<string> AllowedCorsOrigins => new []{AuthenticationOrigin, FrontendAppOrigin};
        public static ICollection<string> AllowedPostLogoutRedirectUris => new []{AuthenticationOrigin, FrontendAppOrigin, FrontendWildcardAppOrigin};
        public static ICollection<string> AllowedRedirectUris => new []{AuthenticationOrigin, FrontendAppOrigin, FrontendWildcardAppOrigin};
    }
}