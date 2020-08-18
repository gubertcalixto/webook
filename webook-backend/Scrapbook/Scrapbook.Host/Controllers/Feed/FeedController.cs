using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Enums.Editor;
using Scrapbook.Domain.Shared;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Feed
{
    public class FeedController: ControllerBase
    {
        private readonly DbSet<EditorDocument> _documentRepository;

        public FeedController(DefaultContext context)
        {
            _documentRepository = context.Documents;
        }
        
        [HttpGet("/feed")]
        public async Task<PagedResultOutput<EditorDocument>> GetFeed(PagedResultInput input)
        {
            var query = _documentRepository
                .Where(r => r.DocumentAccess == EditorDocumentAllowedAccess.Public);

            var totalCount = await query.CountAsync();
            
            // TODO Feed logic
            query = input.Order == "asc" 
                ? query.OrderBy(d => d.LastUpdateTime).ThenBy(d => d.CreationTime)
                : query.OrderByDescending(d => d.LastUpdateTime).ThenByDescending(d => d.CreationTime);
            
            var items = await query
                .Skip(input.SkipCount ?? 0)
                .Take(input.PageSize ?? 20)
                .ToListAsync();
            
            return new PagedResultOutput<EditorDocument>
            {
                Items = items,
                TotalCount = totalCount
            };
        }
    }
}