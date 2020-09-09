using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Enums.Editor;

namespace Scrapbook.Host.Controllers.Document.Dtos
{
    public class DocumentCreateOrUpdateInput
    {
        public Guid? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public EditorDocumentAllowedAccess? AllowedAccess { get; set; }
        public List<Tags> Tags { get; set; }
    }
}