using System;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Editor.Plugin.Component
{
    public class EditorComponentInstance: Entity
    {
        public Guid ComponentId { get; set; }
        public EditorComponent EditorComponent { get; set; }
        public Guid EditorDocumentId { get; set; }
        public EditorDocumentPage DocumentPage { get; set; }
        public double? CoordinateX { get; set; }
        public double? CoordinateY { get; set; }
        public double? Width { get; set; }
        public double? Height { get; set; }
        public int? ZIndex { get; set; }
        public byte[] Data { get; set; }
    }
}