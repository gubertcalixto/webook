using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer.Domain.Dtos;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IdentityServer.Controller
{
    public class UserController: ControllerBase
    {
        private readonly UserContext _userContext;
        private readonly IMapper _mapper;

        public UserController(UserContext userContext, IMapper mapper)
        {
            _userContext = userContext;
            _mapper = mapper;
        }

        [HttpGet("/user/{id}")]
        public async Task<SimplifiedUser> GetUserById(Guid id)
        {
            if(id == Guid.Empty || id == null)
                throw new ArgumentException(nameof(id));
            return _mapper.Map<SimplifiedUser>(await _userContext.ApplicationUsers.FindAsync(id));
        }

          [HttpGet("/users/{username}")]
          public async Task<List<SimplifiedUser>> GetUsersByUsername(string userName, int skipCount = 0, int pageSize = 20)
          {
              if (string.IsNullOrEmpty(userName))
                  throw new ArgumentException(nameof(userName));

              return _mapper.Map<List<SimplifiedUser>>(await _userContext.ApplicationUsers
                  .Where(b => b.UserName.Contains(userName))
                  .Skip(skipCount)
                  .Take(pageSize)
                  .ToListAsync());
          }
    }
}