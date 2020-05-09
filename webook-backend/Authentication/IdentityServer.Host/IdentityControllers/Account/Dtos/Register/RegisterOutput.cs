using System;

namespace IdentityServer.IdentityControllers.Account.Dtos.Register
{
    public enum RegisterOutputResult
    {
        UserAlreadyExists = 0,
        Success = 1,
        Failed
    }
    
    public class RegisterOutput
    {
        public Guid UserId { get; set; }
        public RegisterOutputResult Result { get; set; }
    }
}