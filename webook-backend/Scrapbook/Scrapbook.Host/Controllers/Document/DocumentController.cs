using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Enums.Editor;
using Scrapbook.Host.Controllers.Document.Dtos;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Document
{
    public class DocumentController: CrudBaseController<EditorDocument>
    {
        public DocumentController(DefaultContext context, IMapper mapper, IJwtReader jwtReader) : base(context, context.Documents, mapper, jwtReader)
        {
        }
        
        [HttpPost("/document")]
        public async Task<EditorDocument> Create(DocumentCreateOrUpdateInput input)
        {
            var itemToInsert = Mapper.Map<EditorDocument>(input);

            if (string.IsNullOrEmpty(itemToInsert.Title))
                itemToInsert.Title = await GenerateDocumentTitle();
            else
            {
                var hasSameTitleDocument = await HasSameTitleDocument(itemToInsert.Title);
                if (hasSameTitleDocument)
                {
                    Response.StatusCode = (int) HttpStatusCode.Conflict;
                    return null;
                }
            }

            itemToInsert.UserId = JwtReader.GetUserId();
            itemToInsert.DocumentAccess ??= EditorDocumentAllowedAccess.Private;
            var item = await Repository.AddAsync(itemToInsert);
            await Context.SaveChangesAsync();
            return item.Entity;
        }
        
        [HttpPost("/document/{id}/title")]
        public async Task<string> UpdateTitle(DocumentUpdateTitleInput input, Guid id)
        {
            var document = await Get(id);
            if (document == null)
            {
                Response.StatusCode = (int) HttpStatusCode.NotFound;
                return null;
            }
            if (await HasSameTitleDocument(input.Title))
                return document.Title;
            
            document.Title = input.Title;
            Repository.Update(document);
            await Context.SaveChangesAsync();
            return document.Title;
        }

        [HttpGet("/document/{id}")]
        public new async Task<EditorDocument> Get(Guid id)
        {
            return await base.Get(id);
        }
        
        [HttpPut("/document/{id}")]
        public async Task<EditorDocument> Update(DocumentCreateOrUpdateInput input)
        {
            if(!input.Id.HasValue || input.Id == Guid.Empty)
                throw new ArgumentException(nameof(input.Id));
            
            var item = await Get(input.Id.Value);
            item.Title = input.Title;
            if (!input.Title.Equals(item.Title))
            {
                var hasSameTitleDocument = await HasSameTitleDocument(item.Title);
                if (hasSameTitleDocument)
                {
                    Response.StatusCode = (int) HttpStatusCode.Conflict;
                    return null;
                }
            }
            item.Description = input.Description;
            item.DocumentAccess = input.AllowedAccess ?? EditorDocumentAllowedAccess.Private;
            var result = Repository.Update(item);
            await Context.SaveChangesAsync();
            return result.Entity;
        }

        [HttpDelete("/document/{id}")]
        public new async Task Delete(Guid id)
        {
            var document = await Repository
                .Where(d => d.UserId == JwtReader.GetUserId())
                .FirstOrDefaultAsync(d => d.Id == id);
            if(document != null)
                await base.Delete(document);
        }

        private async Task<bool> HasSameTitleDocument(string itemTitle)
        {
            return await Repository.AnyAsync(d => d.Title.Equals(itemTitle));
        }

        private async Task<string> GenerateDocumentTitle()
        {
            var output = "";
            var currentIndex = 1;
            while (string.IsNullOrEmpty(output))
            {
                const string titlePrefix = "Novo Documento";
                var title = $"{titlePrefix} {currentIndex}";
                if (await Repository.AnyAsync(e => e.Title == title))
                {
                    currentIndex++;
                    continue;
                }
                output = title;
            }

            return output;
        }
    }
}