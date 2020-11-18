using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Host.Controllers.Document.Dtos;
using Scrapbook.Host.Utils;
using Scrapbook.Infrastructure;

namespace Scrapbook.Host.Controllers.Document
{
    public class DocumentInstanceController: ControllerBase
    {
        private readonly DefaultContext _context;
        private readonly DbSet<EditorDocumentPage> _pageRepository;
        private readonly DbSet<EditorDocument> _documentRepository;
        private readonly IMapper _mapper;
        private readonly IJwtReader _jwtReader;

        public DocumentInstanceController(DefaultContext context, IMapper mapper, IJwtReader jwtReader)
        {
            _context = context;
            _pageRepository = context.DocumentPages;
            _documentRepository = context.Documents;
            _mapper = mapper;
            _jwtReader = jwtReader;
        }

        [HttpGet("/document/{documentId}/page/{pageNumber}")]
        [AllowAnonymous]
        public async Task<DocumentPageOutput> GetPage(Guid documentId, int pageNumber)
        {
            var page = await _pageRepository
                .Where(p => p.EditorDocumentId == documentId)
                .Where(p => p.PageNumber == pageNumber)
                .FirstOrDefaultAsync();
            return page == null
                ? null
                : _mapper.Map<DocumentPageOutput>(page);
        }

        [HttpGet("/document/{documentId}/pages/thumbnails")]
        [AllowAnonymous]
        public async Task<Dictionary<string, string>> GetPagesThumbnails(DocumentPagesThumbnailInput input)
        {
            var pagesThumbnails = await _pageRepository
                .Where(d => d.EditorDocumentId == input.DocumentId)
                .Skip(input.SkipCount)
                .Take(input.PageSize)
                .Select(p => new
                {
                    p.PageNumber,
                    p.PreviewImage
                })
                .ToListAsync();
            var pageThumbDictionary = pagesThumbnails.ToDictionary(
                p => p.PageNumber.ToString(), 
                p => p.PreviewImage ?? "");
            return pageThumbDictionary;
        }
        

        [HttpPost("/document/page")]
        public async Task SavePage([FromBody] DocumentSavePageInput input)
        {
            var userId = _jwtReader.GetUserId();
            var document = await _documentRepository
                .FirstOrDefaultAsync(d => d.Id == input.EditorDocumentId && d.UserId == userId);
            if (document == null)
                return;
            var pageInDocument = await _pageRepository
                .FirstOrDefaultAsync(p => p.EditorDocumentId == input.EditorDocumentId
                               && p.PageNumber == input.PageNumber);

            if (input.PageNumber == 1 && !string.IsNullOrEmpty(input.PageThumbnail))
            {
                document.Image = input.PageThumbnail;
                _documentRepository.Update(document);
            }
            
            if (pageInDocument == null)
            {
                var pageToAdd = _mapper.Map<EditorDocumentPage>(input);
                pageToAdd.PreviewImage = input.PageThumbnail;
                await _pageRepository.AddAsync(pageToAdd);
                await _context.SaveChangesAsync();
            }
            else
            {
                pageInDocument.PreviewImage = input.PageThumbnail;
                pageInDocument.PageData = Encoding.UTF8.GetBytes(input.PageData);
                _pageRepository.Update(pageInDocument);
                await _context.SaveChangesAsync();
            }
        }

        [HttpDelete("/document/{documentId}/page/{pageNumber}")]
        public async Task DeletePage(Guid documentId, int pageNumber)
        {
            var allDocumentPages = await _pageRepository
                .Where(p => p.EditorDocumentId == documentId)
                .ToListAsync();
            var pageToDelete = allDocumentPages?.FirstOrDefault(p => p.PageNumber == pageNumber);
            if(pageToDelete == null)
                return;

            var pagesToUpdate = allDocumentPages.Where(p => p.PageNumber > pageNumber).ToList();
            foreach (var pageToUpdate in pagesToUpdate)
                pageToUpdate.PageNumber -= 1;
            
            _pageRepository.Remove(pageToDelete);
            if (pagesToUpdate.Any())
                _pageRepository.UpdateRange(pagesToUpdate);
            await _context.SaveChangesAsync();
        }
    }
}