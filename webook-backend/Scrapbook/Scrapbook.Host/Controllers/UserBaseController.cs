using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers
{
    public class UserBaseController<TEntity>: BaseController<TEntity> where TEntity : class
    {
        public IJwtReader JwtReader { get; set; }
        
        public UserBaseController(DefaultContext context, DbSet<TEntity> repository, IJwtReader jwtReader, IMapper mapper = null) : base(context, repository, mapper)
        {
            JwtReader = jwtReader;
        }
    }
}