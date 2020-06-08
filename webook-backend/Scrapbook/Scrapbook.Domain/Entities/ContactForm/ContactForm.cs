using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.ContactForm
{
    public class ContactForm: Entity
    {
        public string Name { get; set; }
        public ContactFormSubjectType SubjectType { get; set; }
        public string Subject { get; set; }
        public string Email { get; set; }
        public string Body { get; set; }
    }

    public enum ContactFormSubjectType    
    {
        Compliment,
        Complain,
        Question,
        Other
    }
}