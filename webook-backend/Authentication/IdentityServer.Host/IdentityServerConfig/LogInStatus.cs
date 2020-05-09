namespace IdentityServer.IdentityServerConfig
{
    public enum LogInStatus
    {
        Validated = 0,
        IncorrectUserOrPassword = 1,
        UserInactive = 2,
        UserBlocked = 3,
        UnknownError = 4
    }
}