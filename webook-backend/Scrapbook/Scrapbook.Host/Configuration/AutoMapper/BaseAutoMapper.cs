using System;
using AutoMapper;
using Scrapbook.Domain.Entities.ContactForm;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Host.Controllers.ContactForm.Dtos;
using Scrapbook.Host.Controllers.Document.Dtos;

namespace Scrapbook.Host.Configuration.AutoMapper
{
    public class BaseAutoMapper: Profile
    {
        public BaseAutoMapper()
        {
            CreateDocumentMap();
            CreateContactFormMap();
        }

        private void CreateContactFormMap()
        {
            CreateMap<ContactFormInput, ContactForm>()
                .ForMember(f => f.Subject, 
                    opt => opt
                        .MapFrom(r => r.SubjectType.ToString()));
        }

        private void CreateDocumentMap()
        {
            CreateMap<DocumentCreateOrUpdateInput, EditorDocument>();
            CreateMap<EditorDocument, MyEditorDocument>();
        }
    }
}