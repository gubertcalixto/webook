using System.Collections.Generic;
using Scrapbook.Domain.Entities.Editor.Document;

namespace Scrapbook.Domain.Shared
{
    public class PagedResultInput
    {
        public int? SkipCount { get; set; }
        public int? PageSize { get; set; }
        public string Filter { get; set; }
        public string Order { get; set; }
        public string UsernameFilter { get; set; }
        public List<Tags> TagFilter { get; set; }
    }
}