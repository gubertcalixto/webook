using System;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Editor.Document
{
    public class EditorDocumentPage: Entity
    {
        public Guid EditorDocumentId { get; set; }
        public EditorDocument EditorDocument { get; set; }
        public int PageNumber { get; set; }
        public string PreviewImage { get; set; }
    }
}