using System;

namespace Scrapbook.Domain.Entities.Editor.EditorArea
{
    public class EditorArea
    {
        public string Name { get; set; }
        public Guid EditorAreaId { get; set; }
        public EditorAreaTemplate EditorAreaTemplate { get; set; }
    }
}