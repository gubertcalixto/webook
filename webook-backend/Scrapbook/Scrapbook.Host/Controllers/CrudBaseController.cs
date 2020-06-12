using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers
{
    [Authorize]
    public class CrudBaseController<TEntity>: ControllerBase where TEntity : class
    {
        protected readonly DefaultContext Context;
        protected readonly DbSet<TEntity> Repository;
        protected readonly IMapper Mapper;
        protected readonly IJwtReader JwtReader;
        
        public CrudBaseController(DefaultContext context, DbSet<TEntity> repository, IMapper mapper = null, IJwtReader jwtReader = null)
        {
            Context = context;
            Repository = repository;
            JwtReader = jwtReader;
            Mapper = mapper;
        }
        
        protected async Task<TEntity> Get(Guid id)
        {
            return await Repository.FindAsync(id);
        }
        
        protected async Task Delete(Guid id)
        {
            var item = await Repository.FindAsync(id);
            if (item != null)
                Repository.Remove(item);
            await Context.SaveChangesAsync();
        }
    }
}