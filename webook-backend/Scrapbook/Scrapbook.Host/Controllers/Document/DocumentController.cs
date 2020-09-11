using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Enums.Editor;
using Scrapbook.Host.Controllers.Document.Dtos;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Document
{
    public class DocumentController: CrudBaseController<EditorDocument>
    {
        private DbSet<EditorDocumentPage> _editorDocumentPage;
        private DbSet<Tags> _tagsRepository;

        public DocumentController(DefaultContext context, IMapper mapper, IJwtReader jwtReader) : base(context, context.Documents, mapper, jwtReader)
        {
            _editorDocumentPage = context.DocumentPages;
            _tagsRepository = context.DocumentTags;
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
            if (input.Tags != null) {
                itemToInsert.Tags = input.Tags.Select(t =>
                {
                    t.TagName = t.TagName.ToLower();
                    return t;
                }).ToList();
            }
            itemToInsert.DocumentAccess ??= EditorDocumentAllowedAccess.Private;
            itemToInsert.CreationTime = DateTime.Now;

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
        public async Task<DocumentOutput> GetDocumentWithMetadata(Guid id)
        {
            var getResult = await Repository.Include(d => d.Tags).FirstOrDefaultAsync(d => d.Id == id);
            var pageCount = await _editorDocumentPage.CountAsync(p => p.EditorDocumentId == id);
            var output = Mapper.Map<DocumentOutput>(getResult);
            output.PageNumber = pageCount;
            return output;
        }
        
        [HttpPost("/document/{id}")]
        public async Task<EditorDocument> Update([FromBody] DocumentCreateOrUpdateInput input)
        {
            if(!input.Id.HasValue || input.Id == Guid.Empty)
                throw new ArgumentException(nameof(input.Id));
            
            var item = await Repository.Include(d => d.Tags).FirstOrDefaultAsync(d => d.Id == input.Id.Value);
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
            item.LastUpdateTime = DateTime.Now;

            input.Tags ??= new List<Tags>();
            item.Tags ??= new List<Tags>();
            var tagsToAdd = input.Tags.Where(t => !item.Tags.Any(ct => ct.TagName.Equals(t.TagName))).ToList();
            foreach (var tag in tagsToAdd)
                item.Tags.Add(tag);
            var tagsToRemove = item.Tags.Where(t => !input.Tags.Any(ct => ct.TagName.Equals(t.TagName))).ToList();
            foreach (var tag in tagsToRemove)
                item.Tags.Remove(tag);
            var result = Repository.Update(item);
            await Context.SaveChangesAsync();
            return result.Entity;
        }

        [HttpDelete("/document/{id}")]
        public new async Task Delete(Guid id)
        {
            var document = await Repository
                .Include(d => d.Tags)
                .Where(d => d.UserId == JwtReader.GetUserId())
                .FirstOrDefaultAsync(d => d.Id == id);
            if (document == null)
                return;
            if(document.Tags != null && document.Tags.Count > 0)
                _tagsRepository.RemoveRange(document.Tags);
            
            var pages = await _editorDocumentPage
                .Where(p => p.EditorDocumentId == document.Id)
                .ToListAsync();
            if(pages != null && pages.Count > 0)
                _editorDocumentPage.RemoveRange(pages);
            
            Repository.Remove(document);
            await Context.SaveChangesAsync();
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
                if (await Repository.AnyAsync(e => e.UserId == JwtReader.GetUserId() && e.Title == title))
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