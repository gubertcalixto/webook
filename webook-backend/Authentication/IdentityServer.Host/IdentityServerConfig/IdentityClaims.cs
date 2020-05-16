namespace IdentityServer.IdentityServerConfig
{
    public static class IdentityClaims
    {
        public static string Email => nameof(Email).ToLower();
        public static string FirstName => "first_name";
        public static string LastName => "last_name";
        public static string Sub => nameof(Sub).ToLower();    
    }
}