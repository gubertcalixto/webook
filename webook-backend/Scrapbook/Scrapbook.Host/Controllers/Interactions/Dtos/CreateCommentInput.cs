using System;
using System.Collections.Generic;
using Scrapbook.Domain.Entities.Interactions;
using Scrapbook.Domain.Enums.Interactions;

namespace Scrapbook.Host.Controllers.Interactions.Dtos
{
    public class CreateCommentInput
    {
        public Guid ObjectId { get; set; }
        public EditorObjectTypeEnum ObjectTypeEnum { get; set; }
        public Guid InteractionId { get; set; }
        public string Message { get; set; }
        public Guid ParentId { get; set; }
    }
}