using System.Collections.Generic;

namespace IdentityServer.IdentityControllers
{
    public interface IGoogleExternalAuthenticationConfiguration
    {
        string ClientId { get; }
        
        string ClientSecret { get; }
        
        ICollection<string> AllowedScopes { get; }
        
        ICollection<string> DefaultScopes { get; }
    }
}