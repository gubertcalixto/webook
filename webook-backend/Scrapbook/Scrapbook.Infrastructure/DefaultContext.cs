using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Scrapbook.Domain.Entities.ContactForm;
using Scrapbook.Domain.Entities.Editor.Document;
using Scrapbook.Domain.Entities.Editor.EditorArea;
using Scrapbook.Domain.Entities.Editor.Plugin;
using Scrapbook.Domain.Entities.Editor.Plugin.Component;
using Scrapbook.Domain.Entities.Interactions;
using Scrapbook.Domain.Entities.User;

namespace Scrapbook.Infrastructure
{
    public class DefaultContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DefaultContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region User
        public DbSet<UserPreference> UserPreferences { get; set; }
        #endregion User
        
        #region ContactForm
        public DbSet<ContactForm> ContactForms { get; set; }
        #endregion ContactForm
        
        #region Interaction
        public DbSet<EditorComponentFavorite> EditorComponentFavorites { get; set; }
        public DbSet<EditorDocumentAccess> EditorDocumentAccesses { get; set; }
        public DbSet<EditorInteraction> EditorInteractions { get; set; }
        public DbSet<UserFollow> UserFollows { get; set; }
        #endregion Interaction

        #region Editor
        public DbSet<EditorDocument> Documents { get; set; }
        public DbSet<EditorDocumentPage> DocumentPages { get; set; }
        public DbSet<Tags> DocumentTags { get; set; }
        #endregion Editor

        #region EditorArea
        public DbSet<EditorArea> EditorAreas { get; set; }
        public DbSet<EditorAreaUserTemplate> EditorAreaUserTemplates { get; set; }
        #endregion EditorArea
        
        #region EditorPlugins
        public DbSet<EditorPlugin> EditorPlugins { get; set; }
        public DbSet<EditorComponent> EditorComponents { get; set; }
        public DbSet<EditorComponentInstance> EditorComponentInstances { get; set; }
        #endregion EditorPlugins
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
}