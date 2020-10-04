using System;
using Scrapbook.Domain.Entities.Interactions;

namespace Scrapbook.Host.Controllers.Document.Dtos
{
    public class DenounceInput
    {
        public Guid DocumentId { get; set; }
        public DocumentDenounceEnum DenounceMotivation { get; set; }
        public string Description { get; set; }
    }
}