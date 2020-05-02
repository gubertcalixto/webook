using System.ComponentModel.DataAnnotations;

namespace Scrapbook.Domain.Entities.User
{
    public class UserAccess
    {
        [Required]
        public UserAccessStatus Status { get; set; }
        public UserAccessType Type { get; set; }
        [Required]
        public string AttemptIp { get; set; }
        /// <summary>
        /// Navigator | Android | IOS | ...
        /// </summary>
        [Required]
        public string AttemptSource { get; set; }
    }

    public enum UserAccessType
    {
        Login,
        Logout,
        ResetPasswordStart,
        ResetPasswordEnd
    }

    public enum UserAccessStatus
    {
        Success,
        Failed,
        Blocked
    }
}