using IdentityServer.Domain.Dtos.Mail;

namespace IdentityServer.Services
{
    public class MailTemplateService: IMailTemplateService
    {
        public EmailTemplate GetTemplate(string templateId, dynamic args)
        {
            switch (templateId)
            {
                case "welcome":
                    // TODO: Set Production url
                    var redirectUrl = $"http://localhost:5000/login/forgot-password/{args.PasswordHash}";
                    return new EmailTemplate
                    {
                        Subject = "Bem vindo ao Webook",
                        Body = $"Parece que você esqueceu sua senha. Por favor, acesse o link abaixo: {redirectUrl}"
                    };
                default:
                    return null;
            }
        }
    }
}