namespace IdentityServer.IdentityControllers.Account.Dtos.Logout
{
    public class IdentityLogoutInput
    {
        public IdentityLogoutInput() { }

        public IdentityLogoutInput(string logoutId)
        {
            LogoutId = logoutId;
        }
        public string LogoutId { get; set; }
    }
}