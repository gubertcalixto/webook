using System;
using Scrapbook.Domain.Enums.User;
using Scrapbook.Domain.Interfaces.User;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.User
{
    public class UserPreference: Entity, IMustHaveUser
    {
        public SystemAvailableLanguage Language { get; set; }
        public Guid UserId { get; set; }
    }
}