using Microsoft.EntityFrameworkCore;
using Scrapbook.Domain.Entities.ContactForm;
using Scrapbook.Domain.Entities.Editor.Plugin;
using Scrapbook.Domain.Entities.Interactions;
using Scrapbook.Domain.Entities.User;
using PluginData = Scrapbook.Domain.Entities.Template.PluginData;

namespace Scrapbook.Infrastructure
{
    public class DefaultContext : DbContext
    {
        #region Editor
        public DbSet<TemplateComponent> Components { get; set; }
        public DbSet<TemplateComponentGroup> ComponentGroups { get; set; }
        public DbSet<Plugin> Plugins { get; set; }
        #endregion Editor
        
        #region Interaction
        public DbSet<CommentInteraction> Comments { get; set; }
        public DbSet<LikeInteraction> Likes { get; set; }
        public DbSet<LoveInteraction> Loves { get; set; }
        public DbSet<SaveInteraction> Saves { get; set; }
        public DbSet<TagInteraction> Tags { get; set; }
        #endregion Interaction
        
        #region InternalData
        public DbSet<ContactForm> ContactForms { get; set; }
        #endregion Interaction
        
        #region Template
        public DbSet<DocumentPage> DocumentPages { get; set; }
        public DbSet<PluginData> PluginData { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<TemplateBody> TemplateBodies { get; set; }
        #endregion Template
        
        #region User
        public DbSet<User> Users { get; set; }
        public DbSet<UserAccess> UserAccesses { get; set; }
        public DbSet<UserImage> UserImages { get; set; }
        #endregion User
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            const string server = "DESKTOP-K0LPR6S";
            const string database = "SCRAPBOOK";
            // const string visualStudioConnectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=CountriesGo;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
            var sqlServerConnectionString = $"Server={server};Database={database};Trusted_Connection=True;";
            optionsBuilder.UseSqlServer(sqlServerConnectionString);
        }
    }
}