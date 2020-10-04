using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Enums.Editor;
using Scrapbook.Domain.Shared;
using Scrapbook.Domain.Shared.Utils.IQueryable;
using Scrapbook.Host.Controllers.Document.Dtos;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Document
{
    public class DocumentsController: UserBaseController<EditorDocument>
    {
        public DocumentsController(DefaultContext context, IJwtReader jwtReader, IMapper mapper = null) : base(context, context.Documents, jwtReader, mapper)
        {
        }

        [HttpGet("/documents/user/{userId}")]
        public async Task<PagedResultOutput<EditorDocument>> GetAllFromUser(Guid userId, PagedResultInput input)
        {
            var isOwnUser = JwtReader.GetUserId() == userId;
            var query = Repository
                .Where(r => r.UserId == userId)
                .WhereIf(!isOwnUser, r => r.DocumentAccess == EditorDocumentAllowedAccess.Public )
                .WhereIf(!string.IsNullOrEmpty(input.Filter),
                r =>  r.Title.Contains(input.Filter) || r.Description.Contains(input.Filter));

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip(input.SkipCount ?? 0)
                .Take(input.PageSize ?? 20)
                .ToListAsync();
            
            return new PagedResultOutput<EditorDocument>(items, totalCount);
        }
        
        [HttpGet("/documents/my-user")]
        public async Task<List<MyEditorDocument>> GetAll(string querySearch)
        {
            var query = Repository
                .Where(r => r.UserId == JwtReader.GetUserId(true));
            if (!string.IsNullOrEmpty(querySearch))
                query = query.Where(r => r.Description.Contains(querySearch) || r.Title.Contains(querySearch));
            
            var myDocumentEntities = await query.ToListAsync();
            var output = Mapper.Map<List<MyEditorDocument>>(myDocumentEntities);
            return output;
        }

        [AllowAnonymous]
        [HttpGet("/documents/search")]
        public async Task<PagedResultOutput<EditorDocument>> GetAll(PagedResultInput input)
        {
            var query = Repository
                .Where(r => r.DocumentAccess == EditorDocumentAllowedAccess.Public)
                .WhereIf(!string.IsNullOrEmpty(input.Filter),
                    r => r.Title.Contains(input.Filter) || r.Description.Contains(input.Filter));

            var totalCount = await query.CountAsync();

            query = input.Order == "asc" 
                ? query.OrderBy(document => document.Title)
                : query.OrderByDescending(document => document.Title);
            
            var items = await query
                .Skip(input.SkipCount ?? 0)
                .Take(input.PageSize ?? 20)
                .ToListAsync();

            return new PagedResultOutput<EditorDocument>(items, totalCount);
        }

        [HttpGet("/documents")]
        public async Task<List<EditorDocument>> GetAllDocuments(string querySearch)
        {
            var query = Repository.WhereIf(querySearch!=null, r => r.Description.Contains(querySearch) || r.Title.Contains(querySearch));
            
            var documentEntities = await query.ToListAsync();
            var output = Mapper.Map<List<EditorDocument>>(documentEntities);
            return output;
        }
        
        [HttpDelete("/documents/my-user")]
        public async Task DeleteAllMyDocuments()
        {
            var userId = JwtReader.GetUserId();
            var userDocuments = await Repository.Where(r => r.UserId == userId).ToListAsync();

            if (userDocuments.Any())
            {
                Repository.RemoveRange(userDocuments);
                await Context.SaveChangesAsync();
            }
        }
    }
}