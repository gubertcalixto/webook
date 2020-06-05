using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;

namespace IdentityServer.IdentityServerConfig
{
    public static class IdentitySeedData
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };
        }
        
        public static IEnumerable<ApiResource> GetIdentityApis =>
            new List<ApiResource>
            {
                new ApiResource("webook-backend", "Webook Backend")
            };

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "webook-frontend",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "webook-backend"
                    },
                    AllowedCorsOrigins = IdentityDefaultUrls.AllowedCorsOrigins,
                    AllowAccessTokensViaBrowser = true,
                    PostLogoutRedirectUris = IdentityDefaultUrls.AllowedPostLogoutRedirectUris,
                    RequireConsent = false,
                    AccessTokenLifetime = 86400, // 24 hours
                    IdentityTokenLifetime = 86400,
                    AuthorizationCodeLifetime = 86400, // 24 hours
                    RedirectUris = IdentityDefaultUrls.AllowedRedirectUris,
                    DeviceCodeLifetime = 86400 // 24 hours
                }
            };
        }
    }
}