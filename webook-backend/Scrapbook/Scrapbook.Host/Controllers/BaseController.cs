using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers
{
    public class BaseController<TEntity>: ControllerBase where TEntity : class
    {
        protected readonly DefaultContext Context;
        protected readonly DbSet<TEntity> Repository;
        protected readonly IMapper Mapper;
        
        public BaseController(DefaultContext context, DbSet<TEntity> repository, IMapper mapper = null)
        {
            Context = context;
            Repository = repository;
            Mapper = mapper;
        }
    }
}