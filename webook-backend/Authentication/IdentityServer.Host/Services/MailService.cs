using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IdentityServer.IdentityControllers.Account.Dtos.ForgotPassword;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace IdentityServer.Services
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
 
        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }
        
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage
            {
                Sender = MailboxAddress.Parse(_mailSettings.Mail), Subject = mailRequest.Subject,
            };
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            
            var builder = new BodyBuilder();
            if (mailRequest.Attachments != null)
            {
                await GetEmailAttachments(mailRequest, builder);
            }
            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();

            await SendEmailAsync(email);
        }

        public async Task SendEmailAsync(MimeMessage email)
        {
            using (var smtp = new SmtpClient())
            {
                await smtp.ConnectAsync(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);

                var passwordAsBytes = Convert.FromBase64String(_mailSettings.Password);
                var password = Encoding.UTF8.GetString(passwordAsBytes);
                await smtp.AuthenticateAsync(_mailSettings.Mail, password);

                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
            }
        }

        private static async Task GetEmailAttachments(MailRequest mailRequest, BodyBuilder builder)
        {
            foreach (var file in mailRequest.Attachments.Where(file => file.Length > 0))
            {
                byte[] fileBytes;
                using (var ms = new MemoryStream())
                {
                    await file.CopyToAsync(ms);
                    fileBytes = ms.ToArray();
                }

                builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
            }
        }
    }
}