using Microsoft.EntityFrameworkCore;
using IdentityServer.Domain.Entities;
using Microsoft.Extensions.Configuration;

namespace IdentityServer.Infrastructure.EntityFrameworkCore
{
    public class UserContext : DbContext
    {
        private readonly IConfiguration _configuration;
        
        public UserContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ForgotPasswordInfo> ForgotPasswordInfos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUser>().Property(user => user.UrlImg).HasMaxLength(int.MaxValue);
            modelBuilder.Entity<ApplicationUser>().Property(user => user.PasswordSalt).HasMaxLength(int.MaxValue);
            modelBuilder.Entity<ApplicationUser>().Property(user => user.PasswordHash).HasMaxLength(int.MaxValue);
            modelBuilder.Entity<ApplicationUser>().Property(user => user.SecurityStamp).HasMaxLength(int.MaxValue);
            modelBuilder.Entity<ApplicationUser>().Property(user => user.ConcurrencyStamp).HasMaxLength(int.MaxValue);
        }
    }
}