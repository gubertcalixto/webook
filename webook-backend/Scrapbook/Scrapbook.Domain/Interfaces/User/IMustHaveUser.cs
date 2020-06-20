using System;

namespace Scrapbook.Domain.Interfaces.User
{
    public interface IMustHaveUser
    {
        public Guid UserId { get; set; }
    }
}