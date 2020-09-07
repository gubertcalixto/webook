using System;

namespace Scrapbook.Host.Controllers.Document.Dtos
{
    public class DocumentPagesThumbnailInput
    {
        public Guid DocumentId { get; set; }
        public int SkipCount { get; set; }
        public int PageSize { get; set; }
    }
}