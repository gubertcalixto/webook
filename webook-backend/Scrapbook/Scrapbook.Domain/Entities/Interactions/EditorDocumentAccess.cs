using System;
using Scrapbook.Domain.Interfaces.User;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Interactions
{
    public class EditorDocumentAccess: Entity, IMustHaveUser
    {
        public Guid DocumentId { get; set; }
        public Guid UserId { get; set; }
    }
}