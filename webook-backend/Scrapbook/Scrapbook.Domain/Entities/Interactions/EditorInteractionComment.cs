using System;
using System.Collections.Generic;
using Scrapbook.Domain.Enums.Interactions;

namespace Scrapbook.Domain.Entities.Interactions
{
    public class EditorInteractionComment: EditorInteraction
    {
        public new static EditorInteractionTypeEnum InteractionTypeEnum => EditorInteractionTypeEnum.Comment;
        public Guid InteractionId { get; set; }
        public string Message { get; set; }
        public Guid? ParentId { get; set; }
    }
}