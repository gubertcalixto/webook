using System;

namespace IdentityServer.Domain.Dtos
{
    public class SimplifiedUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string UrlImg { get; set; }
        public string Email { get; set; }
    }
}