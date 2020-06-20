namespace Scrapbook.Domain.Shared.Utils
{
    public static class UtilsResources
    {
        public static object GetPropValue(object src, string propName)
        {
            return string.IsNullOrEmpty(propName) ? null : src.GetType().GetProperty(propName)?.GetValue(src, null);
        }
        public static void SetPropValue(object src, string propName, object value)
        {
            if(!string.IsNullOrEmpty(propName)) 
                src.GetType().GetProperty(propName)?.SetValue(src, value);
        }
    }
}