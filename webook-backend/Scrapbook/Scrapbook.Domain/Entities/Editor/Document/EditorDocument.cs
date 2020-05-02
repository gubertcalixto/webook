namespace Scrapbook.Domain.Entities.Editor.Document
{
    public class EditorDocument
    {
        // TODO: Vinculate to User
        public string Title { get; set; }
        public string Description { get; set; }
        public EditorDocumentAccess DocumentAccess { get; set; }
        public string Image { get; set; }
        public string Metadata { get; set; }  // TODO: Fix type
    }
}