namespace IdentityServer.IdentityControllers.Account.Dtos.ForgotPassword
{
    public class ForgotPasswordInput
    {
        public string Email { get; set; }
        public string Hash { get; set; }
        public string Password { get; set; }
    }
}