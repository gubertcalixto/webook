using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Interactions;
using Scrapbook.Domain.Shared.Utils.IQueryable;
using Scrapbook.Host.Controllers.Interactions.Dtos;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Interactions
{
    public class CommentController: UserBaseController<EditorInteractionComment>
    {
        public CommentController(DefaultContext context, IJwtReader jwtReader, IMapper mapper = null) : base(context, context.EditorInteractionComments, jwtReader, mapper)
        {
        }

        [HttpGet("/interaction/comment/{interactionId}")]
        public async Task<EditorInteractionComment> GetComment(GetOrDeleteCommentInput input, Guid interactionId)
        {
            return await Repository
                .WhereIf(input.ObjectId != null, c => c.ObjectId == input.ObjectId)
                .WhereIf(input.ObjectTypeEnum != null, c => c.ObjectTypeEnum == input.ObjectTypeEnum)
                .FirstOrDefaultAsync(c => c.InteractionId == interactionId);
        }
        
        [HttpPost("/interaction/comments")]
        public async Task Comment([FromBody] CreateCommentInput input)
        {
            await Repository.AddAsync(new EditorInteractionComment
            {
                UserId = JwtReader.GetUserId(),
                ObjectId = input.ObjectId,
                ObjectTypeEnum = input.ObjectTypeEnum,
                InteractionId = input.InteractionId,
                Message = input.Message,
                ParentId = input.ParentId
            });
            await Context.SaveChangesAsync();
        }
        
        [HttpPut("/interaction/comment/{interactionId}")]
        public async Task UpdateComment([FromBody] UpdateCommentInput input, Guid interactionId)
        {
            var getInput = new GetOrDeleteCommentInput
            {
                ObjectId = input.ObjectId,
                ObjectTypeEnum = input.ObjectTypeEnum
            };
            var comment = await GetComment(getInput, interactionId);
            if (comment != null)
            {
                comment.Message = input.Message;
                Repository.Update(comment);
                await Context.SaveChangesAsync();
            }
        }
        
        [HttpDelete("/interaction/comment/{interactionId}")]
        public async Task RemoveComment(GetOrDeleteCommentInput input, Guid interactionId)
        {
            var comment = await GetComment(input, interactionId);
            if (comment == null)
                return;
            
            var subComments = await FindSubChildren(comment.Id);
            Repository.RemoveRange(subComments);
            Repository.Remove(comment);
            await Context.SaveChangesAsync();
        }

        [HttpGet("/interaction/comments")]
        public async Task<List<CommentOutput>> GetComments(GetCommentsInput input)
        {
            var comments = await Repository
                .Where(c => c.ObjectId == input.ObjectId && c.ObjectTypeEnum == input.ObjectTypeEnum)
                .WhereIf(input.InteractionId != Guid.Empty, c => c.InteractionId == input.InteractionId)
                .ToListAsync();
            
            var parentComments = comments
                .Where(c => c.ParentId == null)
                .Select(c => Mapper.Map<CommentOutput>(c))
                .ToList();
            
            var output = new List<CommentOutput>();
            foreach (var comment in parentComments)
            {
                // TODO: Bad Performance
                comment.Children = await FindSubChildren(comment.Id);
                output.Add(comment);
            }
            return output;
        }

        private async Task<List<EditorInteractionComment>> FindSubChildren(Guid parentCommentId)
        {
            return await Repository.Where(c => c.ParentId == parentCommentId).ToListAsync();
        }
    }
}