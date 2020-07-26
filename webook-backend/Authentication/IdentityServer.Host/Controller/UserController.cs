using System;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer.Domain.Dtos;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

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
    }
}