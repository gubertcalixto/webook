using Scrapbook.Domain.Enums.Interactions;

namespace Scrapbook.Domain.Entities.Interactions
{
    public class EditorInteractionLike: EditorInteraction
    {
        public new static EditorInteractionTypeEnum InteractionTypeEnum => EditorInteractionTypeEnum.Like;
    }
}