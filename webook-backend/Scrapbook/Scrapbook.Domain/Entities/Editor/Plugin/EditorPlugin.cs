using System;
using Scrapbook.Domain.Interfaces.User;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Editor.Plugin
{
    public class EditorPlugin: Entity, IMustHaveUser
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public int DownloadNumber { get; set; }
        public bool IsDefault { get; set; }
        public Guid UserId { get; set; }
    }
}