using System;

namespace Scrapbook.Host.Controllers.Document.Dtos
{
    public class DocumentPageImageOutput
    {
        public Guid DocumentId { get; set; }
        public int PageNumber { get; set; }
        public string Image { get; set; }
    }
}