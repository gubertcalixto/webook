using System.ComponentModel.DataAnnotations;

namespace Scrapbook.Host.Controllers.Document.Dtos
{
    public class DocumentUpdateTitleInput
    {
        [Required]
        public string Title { get; set; }
    }
}