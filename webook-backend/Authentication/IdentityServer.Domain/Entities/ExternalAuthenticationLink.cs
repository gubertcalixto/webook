using System;

namespace IdentityServer.Domain.Entities
{
    public class ExternalAuthenticationLink
    {
        public Guid Id { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public Guid UserId { get; set; }
        public DateTime AccessTokenExpiresDate { get; set; }
    }
}