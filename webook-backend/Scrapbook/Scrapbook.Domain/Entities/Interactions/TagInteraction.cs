using System.ComponentModel.DataAnnotations;

namespace Scrapbook.Domain.Entities.Interactions
{
    public class TagInteraction
    {
        [Required]
        public string Name { get; set; }
    }
}