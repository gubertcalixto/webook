namespace IdentityServer.IdentityServerConfig
{
    public static class IdentityClaims
    {
        public static string UserId => nameof(UserId);
        public static string Name => nameof(Name);
        public static string Email => nameof(Email);
        public static string AuthTime => nameof(AuthTime);
        public static string Sub => "sub";    
    }
}