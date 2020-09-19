using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace IdentityServer.IdentityControllers
{
    public class GoogleExternalAuthenticationConfiguration : IGoogleExternalAuthenticationConfiguration
    {
        public string ClientId { get; }
        public string ClientSecret { get; }
        public ICollection<string> AllowedScopes { get; }
        public ICollection<string> DefaultScopes { get; }
        
        public GoogleExternalAuthenticationConfiguration()
        {
            DefaultScopes = new List<string>(new [] { "openid", "email", "profile" });
            AllowedScopes = DefaultScopes.ToList();
            
            // TODO Production Hidden value
            var clientIdAsByteArray = Convert.FromBase64String("NTA1MjAyNjgxNDkwLWhmMWE2ZDBoczF0dDgwcjExNW10YzhydHJvYmVrYWdpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t");
            var clientId = Encoding.UTF8.GetString(clientIdAsByteArray);
            var clientPasswordAsByteArray = Convert.FromBase64String("S0JUZjU4X09VLTU1MzdoZ1V1Q3Vtbl9h");
            var clientPassword = Encoding.UTF8.GetString(clientPasswordAsByteArray);
            ClientId = clientId;
            ClientSecret = clientPassword;
            
            var scopesAsString = string.Join(" ", DefaultScopes);
            if (string.IsNullOrEmpty(scopesAsString)) return;
            
            var scopesToAdd = scopesAsString.Split(" ").Where(s => !string.IsNullOrEmpty(s)).ToList();
            foreach (var scope in scopesToAdd.Distinct().Where(scope => !AllowedScopes.Contains(scope)))
                AllowedScopes.Add(scope);
        }
    }
}