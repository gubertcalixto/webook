using System.ComponentModel.DataAnnotations;
using Scrapbook.Domain.Entities.ContactForm;

namespace Scrapbook.Host.Controllers.ContactForm.Dtos
{
    public class ContactFormInput
    {
        [Required]
        public string Name { get; set; }
        public ContactFormSubjectType SubjectType { get; set; }
        [Required]
        [MinLength(3)]
        public string Email { get; set; }
        [Required]
        [MinLength(5)]
        [MaxLength(500)]
        public string Body { get; set; }
    }
}