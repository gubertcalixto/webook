using System;
using Scrapbook.Domain.Interfaces.User;

namespace Scrapbook.Domain.Shared
{
    public class Entity: IEntity
    {
        public Guid Id { get; set; }
    }
}