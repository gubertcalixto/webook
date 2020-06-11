using System;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Shared;
using Scrapbook.Host.Controllers.Document.Dtos;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Document
{
    public class DocumentController: CrudBaseController<EditorDocument>
    {
        public DocumentController(DefaultContext context, DbSet<EditorDocument> repository, IMapper mapper) : base(context, repository, mapper)
        {
        }
        
        [HttpPost("/document")]
        public async Task<EditorDocument> Create(DocumentCreateOrUpdateInput orUpdateInput)
        {
            var itemToInsert = Mapper.Map<EditorDocument>(orUpdateInput);
            
            var hasSameTitleDocument = await HasSameTitleDocument(itemToInsert.Title);
            if (hasSameTitleDocument)
            {
                Response.StatusCode = (int) HttpStatusCode.Conflict;
                return null;
            }
            
            var item = await Repository.AddAsync(itemToInsert);
            await Context.SaveChangesAsync();
            return item.Entity;
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
            item.DocumentAccess = input.AllowedAccess;
            var result = Repository.Update(item);
            await Context.SaveChangesAsync();
            return result.Entity;
        }

        [HttpDelete("/document/{id}")]
        public new async Task Delete(Guid id)
        {
            await base.Delete(id);
        }

        private async Task<bool> HasSameTitleDocument(string itemTitle)
        {
            return await Repository.AnyAsync(d => d.Title.Equals(itemTitle));
        }
    }
}