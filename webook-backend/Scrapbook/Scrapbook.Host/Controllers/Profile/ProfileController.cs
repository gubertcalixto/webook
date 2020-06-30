using System;
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
        private readonly IJwtReader _jwtReader;

        public ProfileController(DefaultContext context, IJwtReader jwtReader)
        {
            _documentRepository = context.Documents;
            _userFollowRepository = context.UserFollows;
            _jwtReader = jwtReader;
        }

        [HttpGet("/my-user/followers-number")]
        public async Task<int> GetFollowersNumber()
        {
            return await GetFollowersNumber(_jwtReader.GetUserId());
        }

        [HttpGet("/my-user/documents-number")]
        public async Task<int> GetDocumentsNumber()
        {
            return await GetDocumentsNumber(_jwtReader.GetUserId());
        }

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
    }
}