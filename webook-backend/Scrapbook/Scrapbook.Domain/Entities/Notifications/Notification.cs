using System;
using Scrapbook.Domain.Enums.NotificationTypeEnum;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Notifications
{
    public class Notification : Entity
    {
        public Guid UserId { get; set; }
        public string Message { get; set; }
        public NotificationTypeEnum NotificationType { get; set; }
        public bool WasRead { get; set; }
        public string LinkId { get; set; }
    }
}