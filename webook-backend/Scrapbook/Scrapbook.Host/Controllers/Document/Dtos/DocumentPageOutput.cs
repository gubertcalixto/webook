using System;

namespace Scrapbook.Host.Controllers.Document.Dtos
{
    public class DocumentPageOutput
    {
        public Guid EditorDocumentId { get; set; }
        public int PageNumber { get; set; }
        public string PageData { get; set; }
    }
}