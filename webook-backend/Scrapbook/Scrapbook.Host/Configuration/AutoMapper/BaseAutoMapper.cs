using System;
using AutoMapper;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Host.Controllers.Document.Dtos;

namespace Scrapbook.Host.Configuration.AutoMapper
{
    public class BaseAutoMapper: Profile
    {
        public BaseAutoMapper()
        {
            CreateDocumentMap();
        }

        private void CreateDocumentMap()
        {
            CreateMap<DocumentCreateOrUpdateInput, EditorDocument>();
            CreateMap<EditorDocument, MyEditorDocument>();
        }
    }
}