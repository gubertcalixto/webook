using System;

namespace IdentityServer.IdentityControllers.Account.Dtos.ForgotPassword
{
 
        public enum ForgotOutputResult
        {
            Emailfailed = 1,
            Success = 2,
            Failed = 3
        }
    
        public class ForgotOutput
        {
            public Guid UserId { get; set; }
            public ForgotOutputResult Result { get; set; }
        }
    
}