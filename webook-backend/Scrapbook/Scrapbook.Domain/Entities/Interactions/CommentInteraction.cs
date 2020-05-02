using System;
using System.ComponentModel.DataAnnotations;

namespace Scrapbook.Domain.Entities.Interactions
{
    public class CommentInteraction
    {
        [Required]
        public string Message { get; set; }
        public Guid? TemplateId { get; set; }
        // For sub comment
        public Guid? ThreadId { get; set; }
        public CommentInteraction Thread { get; set; }
        
        // TODO: Vinculate comment and Template Components
    }
}