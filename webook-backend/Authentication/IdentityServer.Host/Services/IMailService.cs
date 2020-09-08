using System.Threading.Tasks;
using IdentityServer.IdentityControllers.Account.Dtos.ForgotPassword;
using MimeKit;

namespace IdentityServer.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);

        Task SendEmailAsync(MimeMessage email);
    }
}