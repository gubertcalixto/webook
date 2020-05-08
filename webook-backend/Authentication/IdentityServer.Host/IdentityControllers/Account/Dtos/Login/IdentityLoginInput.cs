using System.ComponentModel.DataAnnotations;

namespace IdentityServer.IdentityControllers.Account.Dtos.Login
{
    public class IdentityLoginInput
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
        public string ReturnUrl { get; set; }
    }
}