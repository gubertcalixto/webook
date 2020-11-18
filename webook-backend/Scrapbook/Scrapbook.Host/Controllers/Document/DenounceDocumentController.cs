using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Entities.Interactions;
using Scrapbook.Domain.Enums.Editor;
using Scrapbook.Host.Controllers.Document.Dtos;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Document
{
    public class DenounceDocumentController: CrudBaseController<DenounceDocument>
    {
        private readonly DbSet<EditorDocument> _documentRepository;

        public DenounceDocumentController(DefaultContext context, IMapper mapper = null, IJwtReader jwtReader = null) : base(context, context.DocumentDenounces, mapper, jwtReader)
        {
            _documentRepository = context.Documents;
        }
        
        [HttpPost("/document/{id}/denounce")]
        [AllowAnonymous]
        public async Task Denounce([FromBody] DenounceInput input)
        {
            var userId = JwtReader.GetUserId(false);
            var hasUserAlreadyDenounce = await HasUserAlreadyDenounce(input.DocumentId, input.DenounceMotivation, userId);
            if(hasUserAlreadyDenounce)
                return;
            await Repository.AddAsync(new DenounceDocument
            {
                DocumentId = input.DocumentId,
                DenounceMotivation = input.DenounceMotivation,
                Description = input.Description,
                UserId = userId == Guid.Empty ? (Guid?) null : userId,
                DenounceTime = DateTime.Now
            });
            await Context.SaveChangesAsync();

            await CheckForBlockDocument(input.DocumentId, input.DenounceMotivation);
        }

        private async Task<bool> HasUserAlreadyDenounce(Guid documentId, DocumentDenounceEnum denounceMotivation, Guid userId)
        {
            if (userId == Guid.Empty)
                return false;

            return await Repository
                .Where(d => d.DocumentId == documentId)
                .Where(d => d.DenounceMotivation == denounceMotivation)
                .Where(d => d.UserId == userId)
                .AnyAsync();
        }

        private async Task CheckForBlockDocument(Guid documentId, DocumentDenounceEnum denounceMotivation)
        {
            const int maxDenouncesNumberTotal = 25;
            const int maxDenouncesNumberInMonth = 10;
            const int maxDenouncesNumberInLast48Hours = 4;
            var numberOfDenouncesTotal = await Repository
                .Where(d => d.DocumentId == documentId)
                .Where(d => d.DenounceMotivation == denounceMotivation)
                .CountAsync();
            var numberOfDenouncesInMonth = await Repository
                .Where(d => d.DocumentId == documentId)
                .Where(d => d.DenounceMotivation == denounceMotivation)
                .Where(d => d.DenounceTime > DateTime.Now.AddDays(-30))
                .CountAsync();
            var numberOfDenouncesInLast48Hours = await Repository
                .Where(d => d.DocumentId == documentId)
                .Where(d => d.DenounceMotivation == denounceMotivation)
                .Where(d => d.DenounceTime > DateTime.Now.AddDays(-2))
                .CountAsync();
            if (
                numberOfDenouncesTotal >= maxDenouncesNumberTotal
                || numberOfDenouncesInMonth > maxDenouncesNumberInMonth
                || numberOfDenouncesInLast48Hours > maxDenouncesNumberInLast48Hours
            )
            {
                await BlockDocument(documentId);
            }
        }

        private async Task BlockDocument(Guid documentId)
        {
            var document = await _documentRepository.FindAsync(documentId);
            if(document == null)
                return;
            document.DocumentAccess = EditorDocumentAllowedAccess.Private;
            _documentRepository.Update(document);
            
            // TODO: Notify User
            // var userId = document.UserId;
            
            await Context.SaveChangesAsync();
        }
    }
}