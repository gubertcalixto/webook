namespace Scrapbook.Host.Controllers.UserPreferences
{
    public class UserPreferenceInput
    {
        public bool InvisibleMode { get; set; }
        public bool NewsletterActivated { get; set; }
        public bool AutoplayAudios { get; set; }
        public bool AutoplayVideos { get; set; }
    }
}