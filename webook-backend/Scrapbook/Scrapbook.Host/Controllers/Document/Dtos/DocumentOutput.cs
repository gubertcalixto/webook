using System;
using Scrapbook.Domain.Enums.Editor;
using Scrapbook.Domain.Interfaces.User;

namespace Scrapbook.Host.Controllers.Document.Dtos
{
    public class DocumentOutput: IEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public EditorDocumentAllowedAccess? DocumentAccess { get; set; }
        public string Image { get; set; }
        public Guid UserId { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastUpdateTime { get; set; }
        public int PageNumber { get; set; }
    }
}