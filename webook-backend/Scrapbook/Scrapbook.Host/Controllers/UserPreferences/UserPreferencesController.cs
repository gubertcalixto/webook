using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.User;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.UserPreferences
{
    public class UserPreferencesController: UserBaseController<UserPreference>
    {
        public UserPreferencesController(DefaultContext context, IMapper mapper, IJwtReader jwtReader) : base(context, context.UserPreferences, jwtReader, mapper)
        {
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
            
            // TODO MAKE INVISIBLE MODE WORK
            currentPreference.InvisibleMode = input.InvisibleMode;
            
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
    }
}