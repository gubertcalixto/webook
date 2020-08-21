using System;

namespace Scrapbook.Host.Controllers.Document.Dtos
{
    public class DocumentSavePageInput
    {
        public Guid EditorDocumentId { get; set; }
        public int PageNumber { get; set; }
        public string PageData { get; set; }
    }
}