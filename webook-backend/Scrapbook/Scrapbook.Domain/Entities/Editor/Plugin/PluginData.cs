using System;
using Scrapbook.Domain.Entities.Editor.Document;

namespace Scrapbook.Domain.Entities.Editor.Plugin
{
    public class PluginData
    {
        public Guid PluginId { get; set; }
        public Plugin Plugin { get; set; }
        public Guid DocumentPageId { get; set; }
        public EditorDocumentPage DocumentPage { get; set; }
        public string Data { get; set; } // TODO: Fix type
    }
}