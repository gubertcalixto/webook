using System;
using Scrapbook.Domain.Enums.Interactions;

namespace Scrapbook.Host.Controllers.Interactions.Dtos
{
    public class GetCommentsInput
    {
        public Guid ObjectId { get; set; }
        public EditorObjectTypeEnum ObjectTypeEnum { get; set; }
        public Guid InteractionId { get; set; }
    }
}