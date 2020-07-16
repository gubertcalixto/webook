using System;
using System.Linq;
using System.Linq.Expressions;

namespace Scrapbook.Domain.Shared.Utils.IQueryable
{
    public static class Queryables
    {
        public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool condition, Expression<Func<T, bool>> predicate)
        {
            return condition ? query.Where(predicate) : query;
        }
    }
}