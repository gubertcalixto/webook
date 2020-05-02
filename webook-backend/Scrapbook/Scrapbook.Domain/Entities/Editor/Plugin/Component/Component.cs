using System;

namespace Scrapbook.Domain.Entities.Editor.Plugin.Component
{
    public class Component
    {
        public Guid PluginId { get; set; }
        public Plugin Plugin { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
    }
}