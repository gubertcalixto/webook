using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Entities.Interactions;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Profile
{
    public class ProfileController: ControllerBase
    {
        private readonly DbSet<EditorDocument> _documentRepository;
        private readonly DbSet<UserFollow> _userFollowRepository;
        private readonly IJwtReader JwtReader;
        private readonly DefaultContext Context;

        public ProfileController(DefaultContext context, IJwtReader jwtReader)
        {
            _context = context;
            _documentRepository = context.Documents;
            _userFollowRepository = context.UserFollows;
         //   _jwtReader = jwtReader;
            Context = context;
            JwtReader = jwtReader;
        }
        
        [HttpGet("/my-user/followers-number")]
        public async Task<int> GetFollowersNumber()
        {
            return await GetFollowersNumber(JwtReader.GetUserId());
        }

        //[HttpGet("/my-user/followers-number")]
        //public async Task<int> GetFollowersNumber()
        //{
        //    return await GetFollowersNumber(_jwtReader.GetUserId());
        //}

        //[HttpGet("/my-user/documents-number")]
        //public async Task<int> GetDocumentsNumber()
        //{
        //    return await GetDocumentsNumber(_jwtReader.GetUserId());
        //}

        [HttpGet("/user/{userId}/followers-number")]
        public async Task<int> GetFollowersNumber(Guid userId)
        {
            return await _userFollowRepository.CountAsync(f => f.UserId == userId);
        }

        [HttpGet("/user/{userId}/documents-number")]
        public async Task<int> GetDocumentsNumber(Guid userId)
        {
            return await _documentRepository.CountAsync(d => d.UserId == userId);
        }
        
        [HttpGet("/user/{userId}/is-following")]
        public async Task<bool> IsFollowing(Guid userId)
        {
            if(userId == null)
                throw new ArgumentException(nameof(userId));
            
            var myUserId = _jwtReader.GetUserId();
            return await _userFollowRepository.AnyAsync(f => f.UserId == userId && f.FollowedPersonId == myUserId);
        }
        
        [HttpPost("/user/{userId}/follow")]
        public async Task FollowUser(Guid userId)
        {
            if(userId == null)
                throw new ArgumentException(nameof(userId));
            var myUserId = _jwtReader.GetUserId();
            var hasFollowAlready = await IsFollowing(userId);
            if (hasFollowAlready)
                return;
            var follow = new UserFollow
            {
                UserId = userId,
                FollowedPersonId = myUserId
            };
            await _userFollowRepository.AddAsync(follow);
            await _context.SaveChangesAsync();
        }

        [HttpPost("/user/{userId}/unfollow")]
        public async Task UnfollowUser(Guid userId)
        {
            var myUserId = _jwtReader.GetUserId();
            var dataToDelete = await _userFollowRepository
                .FirstOrDefaultAsync(x => x.FollowedPersonId == myUserId && x.UserId == userId);
            if(dataToDelete == null)
                return;
            _userFollowRepository.Remove(dataToDelete);
            await _context.SaveChangesAsync();
        }
    }
}