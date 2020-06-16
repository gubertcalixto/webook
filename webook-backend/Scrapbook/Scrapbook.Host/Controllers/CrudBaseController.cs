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
    public class CrudBaseController<TEntity>: BaseController<TEntity> where TEntity : class
    {
        protected readonly IJwtReader JwtReader;
        
        public CrudBaseController(DefaultContext context, DbSet<TEntity> repository, IMapper mapper = null, IJwtReader jwtReader = null): base(context, repository, mapper)
        {
            JwtReader = jwtReader;
        }
        
        protected async Task<TEntity> Get(Guid id)
        {
            return await Repository.FindAsync(id);
        }
        
        protected async Task Delete(Guid id)
        {
            var item = await Repository.FindAsync(id);
            await Delete(item);
        }
        
        protected async Task Delete(TEntity entity)
        {
            if (entity != null)
                Repository.Remove(entity);
            await Context.SaveChangesAsync();
        }
    }
}