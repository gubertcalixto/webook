using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Scrapbook.Infrastructure
{
    public class DefaultContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DefaultContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // #region Editor
        // public DbSet<TemplateComponent> Components { get; set; }
        // public DbSet<TemplateComponentGroup> ComponentGroups { get; set; }
        // public DbSet<Plugin> Plugins { get; set; }
        // #endregion Editor
        //
        // #region Interaction
        // public DbSet<CommentInteraction> Comments { get; set; }
        // public DbSet<LikeInteraction> Likes { get; set; }
        // public DbSet<LoveInteraction> Loves { get; set; }
        // public DbSet<SaveInteraction> Saves { get; set; }
        // public DbSet<TagInteraction> Tags { get; set; }
        // #endregion Interaction
        //
        // #region InternalData
        // public DbSet<ContactForm> ContactForms { get; set; }
        // #endregion Interaction
        //
        // #region Template
        // public DbSet<DocumentPage> DocumentPages { get; set; }
        // public DbSet<PluginData> PluginData { get; set; }
        // public DbSet<Template> Templates { get; set; }
        // public DbSet<TemplateBody> TemplateBodies { get; set; }
        // #endregion Template
        
        // #region User
        // public DbSet<User> Users { get; set; }
        // public DbSet<UserAccess> UserAccesses { get; set; }
        // public DbSet<UserImage> UserImages { get; set; }
        // #endregion User
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
}