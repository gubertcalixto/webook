using System;
using Scrapbook.Domain.Entities.Interactions;

namespace Scrapbook.Domain.Interfaces.Interactions
{
    public interface IMayHaveCommentThread
    {
        Guid? ThreadId { get; set; }
        CommentInteraction Thread { get; set; }
    }
}