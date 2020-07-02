namespace IdentityServer.IdentityControllers.Account.Dtos.Register
{
    public enum DoesUserExistsStatus
    {
        NotFound,
        SameEmail,
        SameLogin
    }
}