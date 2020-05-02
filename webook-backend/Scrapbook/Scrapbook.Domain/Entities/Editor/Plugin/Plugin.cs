using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Scrapbook.Domain.Entities.Interactions;

namespace Scrapbook.Domain.Entities.Editor.Plugin
{
    public class Plugin
    {
        [Required]
        public string AuthorId { get; set; } // TODO: Vinculate to User
        [Required]
        public string Name { get; set; }
        public string Image { get; set; }
        public List<TagInteraction> Tags { get; set; }
        public string Description { get; set; }
        public int DownloadNumber { get; set; }
    }
}