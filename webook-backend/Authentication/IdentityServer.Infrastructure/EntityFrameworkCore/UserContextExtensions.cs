using Microsoft.Extensions.DependencyInjection;

namespace IdentityServer.Infrastructure.EntityFrameworkCore
{
    public static class UserContextExtensions
    {
        public static IServiceCollection AddUserDbContext(this IServiceCollection services)
        {
            return services.AddDbContext<UserContext>();
        }
    }
}