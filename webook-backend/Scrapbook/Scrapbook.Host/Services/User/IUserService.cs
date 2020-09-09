using System.Collections.Generic;
using System.Threading.Tasks;
using Scrapbook.Host.Services.User.Dtos;

namespace Scrapbook.Host.Services.User
{
    public interface IUserService
    {
        Task<List<SimplifiedUser>> GetUsersByUserName(string username);
    }
}