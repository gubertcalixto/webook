using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Scrapbook.Host.Services.User.Dtos;

namespace Scrapbook.Host.Services.User
{
    public class UserService: IUserService
    {
        private readonly HttpClient _client;

        public UserService()
        {
            _client = new HttpClient();
        }

        public async Task<List<SimplifiedUser>> GetUsersByUserName(string username)
        {
            if (string.IsNullOrEmpty(username))
                return new List<SimplifiedUser>();
            var response = await _client.GetAsync($"http://localhost:5000/users/{username}");
            if (!response.IsSuccessStatusCode)
                throw new Exception($"Could not get from: http://localhost:5000/users/{username}");
            var responseResult = await response.Content.ReadAsStringAsync();
            var users = JsonSerializer.Deserialize<List<SimplifiedUser>>(responseResult);
            return users;
        }

        public async Task<SimplifiedUser> GetUserById(Guid id)
        {
            if (id == Guid.Empty)
                return new SimplifiedUser();
            var response = await _client.GetAsync($"http://localhost:5000/user/{id}");
            if (!response.IsSuccessStatusCode)
                throw new Exception($"Could not get from: http://localhost:5000/user/{id}");
            var responseResult = await response.Content.ReadAsStringAsync();
            var user = JsonSerializer.Deserialize<SimplifiedUser>(responseResult);
            return user;
        }
    }
}