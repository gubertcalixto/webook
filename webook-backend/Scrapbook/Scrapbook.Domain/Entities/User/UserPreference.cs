using System;
using System.ComponentModel.DataAnnotations.Schema;
using Scrapbook.Domain.Enums.User;
using Scrapbook.Domain.Interfaces.User;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.User
{
    public class UserPreference: Entity, IMustHaveUser
    {
        public Guid UserId { get; set; }
        public bool InvisibleMode { get; set; }
        public bool NewsletterActivated { get; set; }
        public bool AutoplayAudios { get; set; }
        public bool AutoplayVideos { get; set; }
    }
}