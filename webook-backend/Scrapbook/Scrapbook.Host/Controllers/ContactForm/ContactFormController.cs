using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scrapbook.Host.Controllers.ContactForm.Dtos;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.ContactForm
{
    [AllowAnonymous]
    public class ContactFormController: CrudBaseController<Domain.Entities.ContactForm.ContactForm>
    {
        public ContactFormController(DefaultContext context, IMapper mapper = null, IJwtReader jwtReader = null) : base(context, context.ContactForms, mapper, jwtReader)
        {
        }

        [HttpPost("/contact-form")]
        public async Task SendContactForm(ContactFormInput input)
        {
            var entity = Mapper.Map<Domain.Entities.ContactForm.ContactForm>(input);
            await Repository.AddAsync(entity);
            await Context.SaveChangesAsync();
        }
    }
}