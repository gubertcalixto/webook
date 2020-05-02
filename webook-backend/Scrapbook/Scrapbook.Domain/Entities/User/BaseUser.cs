using System.ComponentModel.DataAnnotations;

namespace Scrapbook.Domain.Entities.User
{
    public abstract class BaseUser
    {
        [Required]
        public bool IsDeleted { get; set; }
        [Required]
        public bool IsActive { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required]
        public string PasswordSalt { get; set; }
        [Required]
        public bool HasConfirmedEmail { get; set; }
        /// <summary>
        /// No account created yet (using localStorage)
        /// </summary>
        public bool IsTemporaryUser { get; set; }
    }
}