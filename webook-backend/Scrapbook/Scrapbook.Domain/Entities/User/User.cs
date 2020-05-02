using System;
using System.ComponentModel.DataAnnotations;
using Scrapbook.Domain.Enums.User;

namespace Scrapbook.Domain.Entities.User
{
    public class User: BaseUser
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        public Guid? ImageId { get; set; }
        public UserImage Image { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public GenderEnum Gender { get; set; }
    }
}