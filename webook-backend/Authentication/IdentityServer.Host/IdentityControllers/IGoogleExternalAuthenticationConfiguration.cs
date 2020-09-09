using System.Collections.Generic;

namespace Viasoft.Authentication.Host.Services.IdentityServer.GoogleExternalAuth
{
    public interface IGoogleExternalAuthenticationConfiguration
    {
        string ClientId { get; }
        
        string ClientSecret { get; }
        
        ICollection<string> AllowedScopes { get; }
        
        ICollection<string> DefaultScopes { get; }
    }
}