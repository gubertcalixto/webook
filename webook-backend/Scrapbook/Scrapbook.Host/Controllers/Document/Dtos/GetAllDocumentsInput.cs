using System;
using System.Collections.Generic;
using Scrapbook.Domain.Shared;

namespace Scrapbook.Host.Controllers.Document.Dtos
{
    public class GetAllDocumentsInput: PagedResultInput
    {
        public string UserName { get; set; }
        public List<string> TagFilter { get; set; }
        public int Rate { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}