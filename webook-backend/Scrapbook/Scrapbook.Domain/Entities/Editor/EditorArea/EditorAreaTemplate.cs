namespace Scrapbook.Domain.Entities.Editor.EditorArea
{
    public class EditorAreaTemplate
    {
        // TODO: Vinculate to User
        public string Name { get; set; }
        public bool HasFixedPosition { get; set; }
        public double CoordinateX { get; set; }
        public double CoordinateY { get; set; }
    }
}