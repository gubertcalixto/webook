using System;
using Scrapbook.Domain.Interfaces.User;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Interactions
{
    public class UserFollow: Entity, IMustHaveUser
    {
        public Guid FollowedPersonId { get; set; }
        public Guid UserId { get; set; }
    }
}