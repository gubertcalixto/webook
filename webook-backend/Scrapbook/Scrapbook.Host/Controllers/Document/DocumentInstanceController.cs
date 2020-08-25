using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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
                await _pageRepository.AddAsync(pageToAdd);
                await _context.SaveChangesAsync();
            }
            else
            {
                pageInDocument.PageData = Encoding.ASCII.GetBytes(input.PageData);
                _pageRepository.Update(pageInDocument);
                await _context.SaveChangesAsync();
            }
        }
    }
}