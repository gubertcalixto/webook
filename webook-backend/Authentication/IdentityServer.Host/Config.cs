using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> Ids =>
            new IdentityResource[] { new IdentityResources.OpenId() };

        public static IEnumerable<ApiResource> Apis => new ApiResource[]
        {
            new ApiResource("scrapbook-backend", "Scrapbook Backend")
        };
        
        public static IEnumerable<Client> Clients =>
            new Client[] 
            { 
                new Client
                {
                    ClientId = "scrapbook-frontend",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    ClientSecrets = { new Secret("secret".Sha256())},
                    AllowedScopes = { "scrapbook-backend" }
                }
            };
        
    }
}