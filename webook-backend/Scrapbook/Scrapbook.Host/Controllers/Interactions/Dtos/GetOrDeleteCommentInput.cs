using System;
using Scrapbook.Domain.Enums.Interactions;

namespace Scrapbook.Host.Controllers.Interactions.Dtos
{
    public class GetOrDeleteCommentInput
    {
        public Guid? ObjectId { get; set; }
        public EditorObjectTypeEnum? ObjectTypeEnum { get; set; }
    }
}