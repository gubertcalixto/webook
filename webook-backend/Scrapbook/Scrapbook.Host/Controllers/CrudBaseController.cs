using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers
{
    public class CrudBaseController<TEntity>: ControllerBase where TEntity : class
    {
        protected readonly DefaultContext Context;
        protected readonly DbSet<TEntity> Repository;
        protected readonly IMapper Mapper;
        
        public CrudBaseController(DefaultContext context, DbSet<TEntity> repository, IMapper mapper = null)
        {
            Context = context;
            Repository = repository;
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