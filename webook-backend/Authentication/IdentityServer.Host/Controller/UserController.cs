using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer.Domain.Dtos;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using IdentityServer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.Controller
{
    public class UserController: ControllerBase
    {
        private readonly UserContext _userContext;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public UserController(UserContext userContext, IMapper mapper, ICurrentUserService currentUserService)
        {
            _userContext = userContext;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        [HttpGet("/user/{id}")]
        public async Task<SimplifiedUser> GetUserById(Guid id)
        {
            if(id == Guid.Empty || id == null)
                throw new ArgumentException(nameof(id));
            return _mapper.Map<SimplifiedUser>(await _userContext.ApplicationUsers.FindAsync(id));
        }

        [HttpGet("/user/{id}/image")]
        public async Task<string> GetUserImage(Guid id)
        {
            if(id == Guid.Empty || id == null)
                throw new ArgumentException(nameof(id));
            return await _userContext.ApplicationUsers
                .Where(u => u.Id == id)
                .Select(u => u.UrlImg)
                .FirstOrDefaultAsync();
        }

        [HttpPut("/user/image")]
        public async Task<string> UpdateUserImage([FromBody] UserImageInput input)
        {
            var userId = _currentUserService.GetCurrentUserId();
            if (!userId.HasValue)
                throw new AuthenticationException("User is not authenticated");
            
            var id = userId.Value;
            if(userId == Guid.Empty || id == null)
                throw new ArgumentException(nameof(id));
            var user = await _userContext.ApplicationUsers.FindAsync(id);
            user.UrlImg = input.UserImage;
            _userContext.Update(user);
            await _userContext.SaveChangesAsync();
            return user.UrlImg;
        }

        [HttpGet("/users/{username}")]
        public async Task<List<SimplifiedUser>> GetUsersByUsername(string userName, int skipCount = 0, int pageSize = 20)
        {
            if (string.IsNullOrEmpty(userName))
                throw new ArgumentException(nameof(userName));
                
            var normalizedUserName = userName.ToLower();
    
            return _mapper.Map<List<SimplifiedUser>>(await _userContext.ApplicationUsers
                .Where(b => b.UserName.ToLower().Contains(normalizedUserName))
                .Skip(skipCount)
                .Take(pageSize)
                .ToListAsync());
        }
    }
}