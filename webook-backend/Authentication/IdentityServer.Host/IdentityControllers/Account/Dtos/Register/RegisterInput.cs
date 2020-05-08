using System;
using System.ComponentModel.DataAnnotations;

namespace IdentityServer.IdentityControllers.Account.Dtos.Register
{
    public class RegisterInput
    {
        [Required]
        public Guid Id { get; set; }
        
        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        [Required]
        public string Login { get; set; }

        [Required]
        public string Email { get; set; }
        
        public string Password { get; set; }
    }
}