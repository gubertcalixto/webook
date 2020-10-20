using System;
using System.Text.Json.Serialization;

namespace Scrapbook.Host.Services.User.Dtos
{
    public class SimplifiedUser
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }
        [JsonPropertyName("secondName")]
        public string SecondName { get; set; }
        [JsonPropertyName("urlImg")]
        public string UrlImg { get; set; }
        [JsonPropertyName("email")]
        public string Email { get; set; }
    }
}