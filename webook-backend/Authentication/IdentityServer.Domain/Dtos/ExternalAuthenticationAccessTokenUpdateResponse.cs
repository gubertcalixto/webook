using Newtonsoft.Json;

namespace IdentityServer.Domain.Dtos
{
    public class ExternalAuthenticationAccessTokenUpdateResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }
        [JsonProperty("scope")]
        public string Scope { get; set; }
        [JsonProperty("token_type")]
        public string TokenType { get; set; }
        [JsonProperty("id_token")]
        public string IdToken { get; set; }
    }
}