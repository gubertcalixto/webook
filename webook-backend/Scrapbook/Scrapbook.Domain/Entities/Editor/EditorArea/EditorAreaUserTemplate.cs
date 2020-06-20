using System;
using Scrapbook.Domain.Enums.Editor;
using Scrapbook.Domain.Interfaces.User;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Domain.Entities.Editor.EditorArea
{
    public class EditorAreaUserTemplate: Entity, IMustHaveUser
    {
        public Guid EditorAreaId { get; set; }
        public EditorArea EditorArea { get; set; }
        public bool HasFixedPosition { get; set; }
        public EditorAreaFixedPositions? FixedPosition { get; set; }
        public double? CoordinateX { get; set; }
        public double? CoordinateY { get; set; }
        public Guid UserId { get; set; }
    }
}