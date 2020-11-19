using System;
using Scrapbook.Domain.Enums.Interactions;
using Scrapbook.Domain.Interfaces.User;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Interactions
{
    public abstract class EditorInteraction: Entity, IMustHaveUser
    {
        public EditorObjectTypeEnum ObjectTypeEnum { get; set; }
        public Guid ObjectId { get; set; }
        public EditorInteractionTypeEnum InteractionTypeEnum { get; set; }
        public Guid UserId { get; set; }
    }
}