using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Interactions;
using Scrapbook.Host.Controllers.Interactions.Dtos;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Interactions
{
    public class LikeDislikeController: ControllerBase
    {
        private readonly DefaultContext _context;
        private readonly DbSet<EditorInteractionLike> _likeRepository;
        private readonly DbSet<EditorInteractionDislike> _dislikeRepository;
        private readonly IJwtReader _jwtReader;

        public LikeDislikeController(DefaultContext context, IJwtReader jwtReader)
        {
            _context = context;
            _jwtReader = jwtReader;
            _likeRepository = context.EditorInteractionLikes;
            _dislikeRepository = context.EditorInteractionDislikes;
        }

        [HttpPost("/interaction/like")]
        public async Task Like([FromBody] LikeDislikeInput input)
        {
            var hasLike = await HasLike(input);
            if(hasLike)
                return;
            var hasDislike = await HasDislike(input);
            if (hasDislike)
                await RemoveDislike(input);
            
            await _likeRepository.AddAsync(new EditorInteractionLike
            {
                UserId = _jwtReader.GetUserId(),
                ObjectId = input.ObjectId,
                ObjectTypeEnum = input.ObjectTypeEnum
            });
            await _context.SaveChangesAsync();
        }

        [HttpGet("/interaction/like")]
        public async Task<bool> HasLike([FromQuery] LikeDislikeInput input)
        {
            var userId = _jwtReader.GetUserId();
            return await _likeRepository
                .Where(d => d.UserId ==  userId)
                .Where(d => d.ObjectTypeEnum == input.ObjectTypeEnum)
                .Where(d => d.ObjectId == input.ObjectId)
                .AnyAsync();
        }

        [HttpDelete("/interaction/like")]
        public async Task RemoveLike(LikeDislikeInput input)
        {
            var userId = _jwtReader.GetUserId();
            var likeItem = await _likeRepository
                .Where(d => d.UserId == userId)
                .Where(d => d.ObjectTypeEnum == input.ObjectTypeEnum)
                .Where(d => d.ObjectId == input.ObjectId)
                .FirstOrDefaultAsync();
            if (likeItem != null)
            {
                _likeRepository.Remove(likeItem);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPost("/interaction/dislike")]
        public async Task Dislike([FromBody] LikeDislikeInput input)
        {
            var hasDislike = await HasDislike(input);
            if(hasDislike)
                return;
            var hasLike = await HasLike(input);
            if (hasLike)
                await RemoveLike(input);
            
            await _dislikeRepository.AddAsync(new EditorInteractionDislike
            {
                UserId = _jwtReader.GetUserId(),
                ObjectId = input.ObjectId,
                ObjectTypeEnum = input.ObjectTypeEnum
            });
            await _context.SaveChangesAsync();
        }

        [HttpGet("/interaction/dislike")]
        public async Task<bool> HasDislike([FromQuery] LikeDislikeInput input)
        {
            var userId = _jwtReader.GetUserId();
            return await _dislikeRepository
                .Where(d => d.UserId == userId)
                .Where(d => d.ObjectTypeEnum == input.ObjectTypeEnum)
                .Where(d => d.ObjectId == input.ObjectId)
                .AnyAsync();
        }

        [HttpDelete("/interaction/dislike")]
        public async Task RemoveDislike(LikeDislikeInput input)
        {
            var userId = _jwtReader.GetUserId();
            var dislikeItem = await _dislikeRepository
                .Where(d => d.UserId == userId)
                .Where(d => d.ObjectTypeEnum == input.ObjectTypeEnum)
                .Where(d => d.ObjectId == input.ObjectId)
                .FirstOrDefaultAsync();
            if (dislikeItem != null)
            {
                _dislikeRepository.Remove(dislikeItem);
                await _context.SaveChangesAsync();
            }
        }

        [HttpGet("/interaction/like-or-dislike")]
        public async Task<HasLikeOrDislikeOutputEnum> HasLikeOrDislike([FromQuery] LikeDislikeInput input)
        {
            var hasDislike = await HasDislike(input);
            var hasLike = await HasLike(input);
            if (!hasLike && !hasDislike) return HasLikeOrDislikeOutputEnum.None;
            return hasLike
                ? HasLikeOrDislikeOutputEnum.OnlyLike
                : HasLikeOrDislikeOutputEnum.OnlyDislike;
        }
    }
}