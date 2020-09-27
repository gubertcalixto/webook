using System;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Interactions
{
    public class DenounceDocument: Entity
    {
        public Guid DocumentId { get; set; }
        public EditorDocument Document { get; set; }
        public DocumentDenounceEnum DenounceMotivation { get; set; }
        public string Description { get; set; }
        public DateTime DenounceTime { get; set; }
        public Guid? UserId { get; set; }
    }
}