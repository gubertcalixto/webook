using System;

namespace IdentityServer.Domain.Entities
{
    public class ForgotPasswordInfo
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime ExpirationTime { get; set; }
        public string Hash { get; set; }
    }
}