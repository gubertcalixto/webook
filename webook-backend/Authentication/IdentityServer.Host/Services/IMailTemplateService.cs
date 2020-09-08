using System.Threading.Tasks;
using IdentityServer.Domain.Dtos.Mail;

namespace IdentityServer.Services
{
    public interface IMailTemplateService
    {
        EmailTemplate GetTemplate(string templateId, dynamic templateArgs);
    }
}