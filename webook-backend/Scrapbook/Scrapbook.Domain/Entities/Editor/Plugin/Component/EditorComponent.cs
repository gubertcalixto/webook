using System;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Editor.Plugin.Component
{
    public class EditorComponent: Entity
    {
        public Guid PluginId { get; set; }
        public EditorPlugin EditorPlugin { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
    }
}