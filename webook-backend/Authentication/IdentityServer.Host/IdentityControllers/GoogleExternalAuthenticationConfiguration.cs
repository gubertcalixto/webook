using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Viasoft.Authentication.Domain.Consts;

namespace Viasoft.Authentication.Host.Services.IdentityServer.GoogleExternalAuth
{
    public class GoogleExternalAuthenticationConfiguration : IGoogleExternalAuthenticationConfiguration
    {
        public string ClientId { get; }
        public string ClientSecret { get; }
        public ICollection<string> AllowedScopes { get; }
        public ICollection<string> DefaultScopes { get; }
        
        public GoogleExternalAuthenticationConfiguration(IConfigurationRoot configurationRoot)
        {
            DefaultScopes = new List<string>(new [] { "openid", "email", "profile" });
            AllowedScopes = DefaultScopes.ToList();
            ClientId = configurationRoot[ExternalAuthenticationConsts.GoogleExternalAuth.ClientIdPath];
            ClientSecret = configurationRoot[ExternalAuthenticationConsts.GoogleExternalAuth.ClientSecretPath];
            
            var scopesAsString = configurationRoot[ExternalAuthenticationConsts.GoogleExternalAuth.ClientAllowedScopesPath];
            if (string.IsNullOrEmpty(scopesAsString)) return;
            
            var scopesToAdd = scopesAsString.Split(" ").Where(s => !string.IsNullOrEmpty(s)).ToList();
            ExternalAuthenticationConsts.ReplaceFullNamedScopes(scopesToAdd);
            foreach (var scope in scopesToAdd.Distinct().Where(scope => !AllowedScopes.Contains(scope)))
                AllowedScopes.Add(scope);
        }

    }
}