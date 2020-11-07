using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Entities.User;
using Scrapbook.Domain.Enums.Editor;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.UserPreferences
{
    public class UserPreferencesController: UserBaseController<UserPreference>
    {
        private readonly DbSet<EditorDocument> _documentsRepository;

        public UserPreferencesController(DefaultContext context, IMapper mapper, IJwtReader jwtReader) : base(context, context.UserPreferences, jwtReader, mapper)
        {
            _documentsRepository = context.Documents;
        }

        [HttpGet("/user-preferences")]
        public async Task<UserPreferenceOutput> Get()
        {
            var result = await GetEntity();
            var output = Mapper.Map<UserPreferenceOutput>(result);
            return output;
        }

        [HttpPost("/user-preferences")]
        public async Task<UserPreferenceOutput> Create([FromBody] UserPreferenceInput input)
        {
            var userId = JwtReader.GetUserId();
            var userPreference = Mapper.Map<UserPreference>(input);
            userPreference.UserId = userId;
            
            if(userPreference.InvisibleMode)
                await SetAllDocumentsAsPrivate(userId);
            
            var result = await Repository.AddAsync(userPreference);
            await Context.SaveChangesAsync();
            
            var output = Mapper.Map<UserPreferenceOutput>(result.Entity);
            return output;
        }
        
        [HttpPut("/user-preferences")]
        public async Task<UserPreferenceOutput> Update([FromBody] UserPreferenceInput input)
        {
            var currentPreference = await GetEntity();
            if (currentPreference == null)
            {
                Response.StatusCode = (int) HttpStatusCode.NotFound;
                return null;
            }

            currentPreference.AutoplayAudios = input.AutoplayAudios;
            currentPreference.AutoplayVideos = input.AutoplayVideos;
            currentPreference.NewsletterActivated = input.NewsletterActivated;
            
            currentPreference.InvisibleMode = input.InvisibleMode;
            if (currentPreference.InvisibleMode)
                await SetAllDocumentsAsPrivate(currentPreference.UserId);
            
            var result = Repository.Update(currentPreference);
            await Context.SaveChangesAsync();
            
            var output = Mapper.Map<UserPreferenceOutput>(result.Entity);
            return output;
        }

        private async Task<UserPreference> GetEntity()
        {
            var userId = JwtReader.GetUserId();
            return await Repository.FirstOrDefaultAsync(up => up.UserId == userId);
        }

        private async Task SetAllDocumentsAsPrivate(Guid userId)
        {
            var documentsToUpdate = await _documentsRepository
                .Where(d => d.UserId == userId)
                .Where(d => d.DocumentAccess != EditorDocumentAllowedAccess.Private)
                .ToListAsync();
            foreach (var document in documentsToUpdate)
            {
                document.DocumentAccess = EditorDocumentAllowedAccess.Private;
            }
            _documentsRepository.UpdateRange(documentsToUpdate);
        }
    }
}