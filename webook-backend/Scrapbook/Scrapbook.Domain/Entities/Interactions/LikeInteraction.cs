using System;

namespace Scrapbook.Domain.Entities.Interactions
{
    public class LikeInteraction
    {
        public Guid? TemplateId { get; set; }
        public Guid? ThreadId { get; set; }
        public CommentInteraction Thread { get; set; }
    }
}