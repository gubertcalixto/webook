using System;

namespace IdentityServer.Services
{
    public interface ICurrentUserService
    {
        Guid? GetCurrentUserId();
    }
}