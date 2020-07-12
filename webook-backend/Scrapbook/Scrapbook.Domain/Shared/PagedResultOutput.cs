using System.Collections.Generic;

namespace Scrapbook.Domain.Shared
{
    public class PagedResultOutput<T>
    {
        public PagedResultOutput()
        {
            
        }
        
        public PagedResultOutput(List<T> items, int totalCount)
        {
            Items = items;
            TotalCount = totalCount;
        }

        public List<T> Items { get; set; }
        public int TotalCount { get; set; }
    }
}