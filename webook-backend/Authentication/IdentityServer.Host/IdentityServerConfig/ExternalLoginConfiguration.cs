namespace IdentityServer.IdentityServerConfig
{
    public static class ExternalLoginConfiguration
    {
        public static class Google
        {
            public static string ClientId => nameof(ClientId);
            public static string ClientSecret => nameof(ClientSecret);
        }
    }
}