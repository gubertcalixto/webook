using System;
using Scrapbook.Domain.Interfaces.User;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Interactions
{
    public class EditorComponentFavorite: Entity, IMustHaveUser
    {
        public Guid EditorComponentId { get; set; }
        public Guid UserId { get; set; }
    }
}