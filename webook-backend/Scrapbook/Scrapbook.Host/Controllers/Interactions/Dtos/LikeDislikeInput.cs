using System;
using Scrapbook.Domain.Enums.Interactions;

namespace Scrapbook.Host.Controllers.Interactions.Dtos
{
    public class LikeDislikeInput
    {
        public EditorObjectTypeEnum ObjectTypeEnum { get; set; }
        public Guid ObjectId { get; set; }
    }
}