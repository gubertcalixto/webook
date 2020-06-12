using System;
using System.Collections.Generic;
using System.Linq;
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
    public class DocumentsController: UserBaseController<EditorDocument>
    {
        public DocumentsController(DefaultContext context, IJwtReader jwtReader, IMapper mapper = null) : base(context, context.Documents, jwtReader, mapper)
        {
        }

        [HttpGet("/documents/user/{userId}")]
        public async Task<List<EditorDocument>> GetAll(Guid userId)
        {
            return await Repository
                .Where(r => r.UserId == userId)
                .Where(r => r.DocumentAccess == EditorDocumentAllowedAccess.Public)
                .ToListAsync();
        }
        
        [HttpGet("/documents/my-user")]
        public async Task<List<MyEditorDocument>> GetAll()
        {
            var myDocumentEntities = await Repository.Where(r => r.UserId == JwtReader.GetUserId()).ToListAsync();
            var output = Mapper.Map<List<MyEditorDocument>>(myDocumentEntities);
            return output;
        }
    }
}