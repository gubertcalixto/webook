using System;
using Scrapbook.Domain.Enums.NotificationTypeEnum;

namespace Scrapbook.Host.Controllers.Notifications.Dtos
{
    public class NotificationInput
    {
        public Guid UserId { get; set; }
        public NotificationTypeEnum NotificationType { get; set; }
        public Guid DocumentId { get; set; }
    }
}