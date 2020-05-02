using System;

namespace Scrapbook.Domain.Entities.Editor.Plugin.Component
{
    public class ComponentInstance
    {
        public Guid ComponentId { get; set; }
        public Component Component { get; set; }
        public double CoordinateX { get; set; }
        public double CoordinateY { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public int ZIndex { get; set; }
        public string Data { get; set; } // TODO: Fix type
    }
}