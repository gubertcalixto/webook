using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Shared.Utils.IQueryable;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Document
{
    public class DocumentTagController
    {
        private readonly DbSet<Tags> _tagsRepository;

        public DocumentTagController(DefaultContext context)
        {
            _tagsRepository = context.DocumentTags;
        }
        
        [HttpGet("/documents/tags")]
        public async Task<List<string>> GetTags(string tagName, int skipCount = 0, int pageSize = 20)
        {
            var normalizedTagName = tagName?.ToLower();
            var tags = await _tagsRepository
                .WhereIf(!string.IsNullOrEmpty(tagName), t => t.TagName.Contains(normalizedTagName))
                .Select(t => t.TagName)
                .Skip(skipCount)
                .Take(pageSize)
                .ToListAsync();
            return tags;
        }
    }
}