using IdentityServer.IdentityServerConfig;

namespace IdentityServer.IdentityControllers.Account.Dtos.Login
{
    public class IdentityLoginOutput
    {
        public LogInStatus LoginResult { get; set; }
        public string LoginResultDescription => LoginResult.ToString();
        public string RedirectUrl { get; set; }
        public string Message { get; set; }
    }
}