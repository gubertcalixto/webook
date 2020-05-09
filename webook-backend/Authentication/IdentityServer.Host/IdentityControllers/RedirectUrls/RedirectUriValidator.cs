using System;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Validation;

namespace IdentityServer.IdentityControllers.RedirectUrls
{
    public class RedirectUriValidator: IRedirectUriValidator
    {
        public Task<bool> IsRedirectUriValidAsync(string requestedUri, Client client)
        {
            var urlValid = false;
            foreach (var redirectUri in client.RedirectUris)
            {
                // length - 2: Removes from substring /*
                if (redirectUri.EndsWith("/*"))
                    urlValid = requestedUri.StartsWith(redirectUri.Substring(0, redirectUri.Length - 2));
                else
                    urlValid = redirectUri == requestedUri;
        
                if(urlValid)
                    break;
            }
            return Task.FromResult(urlValid);
        }

        public Task<bool> IsPostLogoutRedirectUriValidAsync(string requestedUri, Client client)
        {
            var urlValid = false;
            foreach (var postRedirectUri in client.PostLogoutRedirectUris)
            {
                if (postRedirectUri.Contains("/*"))
                    urlValid = requestedUri.StartsWith(postRedirectUri.Substring(0, postRedirectUri.IndexOf("/*", StringComparison.Ordinal)));
                else
                    urlValid = postRedirectUri == requestedUri;
                
                if(urlValid)
                    break;
            }
            return Task.FromResult(urlValid);
        }
    }
}