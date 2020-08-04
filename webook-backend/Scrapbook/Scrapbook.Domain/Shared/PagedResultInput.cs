using System.ComponentModel.DataAnnotations;

namespace Scrapbook.Domain.Shared
{
    public class PagedResultInput
    {
        public int? SkipCount { get; set; }
        public int? PageSize { get; set; }
        public string Filter { get; set; }
        
        public string Order { get; set; }
    }
}