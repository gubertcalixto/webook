using System;

namespace Scrapbook.Domain.Entities.Editor.Document
{
    public class EditorDocumentPage
    {
        public Guid EditorDocumentId { get; set; }
        public EditorDocument EditorDocument { get; set; }
        public int PageNumber { get; set; }
        public string PreviewImage { get; set; }
        public string Metadata { get; set; }  // TODO: Fix type
    }
}