using System;
using Scrapbook.Domain.Interfaces.User;

namespace Scrapbook.Host.Controllers.Document.Dtos
{
    public class MyEditorDocument: IEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}