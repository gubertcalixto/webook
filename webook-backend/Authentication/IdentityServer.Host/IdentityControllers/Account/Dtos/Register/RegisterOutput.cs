using System;

namespace IdentityServer.IdentityControllers.Account.Dtos.Register
{
    public enum RegisterOutputResult
    {
        LoginConflict = 0,
        EmailConflict = 1,
        Success = 2,
        Failed = 3
    }
    
    public class RegisterOutput
    {
        public Guid UserId { get; set; }
        public RegisterOutputResult Result { get; set; }
    }
}