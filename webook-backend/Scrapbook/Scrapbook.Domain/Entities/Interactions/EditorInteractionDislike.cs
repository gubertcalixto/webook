using Scrapbook.Domain.Enums.Interactions;

namespace Scrapbook.Domain.Entities.Interactions
{
    public class EditorInteractionDislike: EditorInteraction
    {
        public new static EditorInteractionTypeEnum InteractionTypeEnum => EditorInteractionTypeEnum.Dislike;
    }
}