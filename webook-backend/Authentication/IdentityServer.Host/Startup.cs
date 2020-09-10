using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using AutoMapper;
using IdentityServer.Domain.Entities;
using IdentityServer.IdentityControllers;
using IdentityServer.IdentityControllers.Account.Dtos.ForgotPassword;
using IdentityServer.IdentityControllers.Profile;
using IdentityServer.IdentityControllers.RedirectUrls;
using IdentityServer.IdentityServerConfig;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using IdentityServer.Mapper;
using IdentityServer.Services;
using IdentityServer4;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace IdentityServer
{
    public class Startup
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IConfiguration _configuration;
        private const string CorsDefinition = "DefaultCors";

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: CorsDefinition,
                    builder =>
                    {
                        // TODO: Production Mode
                        builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
                    });
            });
            services.AddControllers();
            services
                .AddAutoMapper(typeof(Startup))
                .AddUserDbContext()
                .AddAuthorization()
                .AddIdentityCore<ApplicationUser>(o =>
                {
                    o.Stores.MaxLengthForKeys = 128;
                })
                .AddDefaultTokenProviders()
                .AddUserStore<ApplicationUserStore>();
            
            var migrationsAssembly = typeof(UserContext).GetTypeInfo().Assembly.GetName().Name;
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            services.AddIdentityServer(opt =>
                {
                    if (_environment.IsDevelopment()){
                        opt.Events.RaiseErrorEvents = true;
                        opt.Events.RaiseInformationEvents = true;
                        opt.Events.RaiseFailureEvents = true;
                        opt.Events.RaiseSuccessEvents = true;
                    }
                })
                .AddProfileService<IdentityClaimsProfileService>()
                .AddConfigurationStore(options =>
                {
                    options.ResolveDbContextOptions = (provider, builder) =>
                    {
                        builder.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(migrationsAssembly));
                    };
                })
                .AddOperationalStore(options =>
                {
                    options.ResolveDbContextOptions = (provider, builder) =>
                    {
                        builder.UseSqlServer(connectionString, sql => sql.MigrationsAssembly(migrationsAssembly));
                    };
                
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 30;
                })
                // TODO Production Configuration
                .AddDeveloperSigningCredential();
            
            services.AddAuthentication()
               .AddGoogle("Google", options =>
                {
                    // TODO Hidden value
                    var clientIdAsByteArray = Convert.FromBase64String("NTA1MjAyNjgxNDkwLWhmMWE2ZDBoczF0dDgwcjExNW10YzhydHJvYmVrYWdpLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t");
                    var clientId = Encoding.UTF8.GetString(clientIdAsByteArray);
                    var clientPasswordAsByteArray = Convert.FromBase64String("S0JUZjU4X09VLTU1MzdoZ1V1Q3Vtbl9h");
                    var clientPassword = Encoding.UTF8.GetString(clientPasswordAsByteArray);
                    
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                    options.ClientId = clientId;
                    options.ClientSecret = clientPassword;
                    options.CallbackPath = "/";
                    options.AccessDeniedPath = "/oauth/External/AccessDeniedCallback";
                    options.SaveTokens = true;
                    options.AccessType = "offline";
                });

            services.Configure<MailSettings>(_configuration.GetSection("MailSettings"));

            services
                .AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>()
                .AddTransient<IProfileService, IdentityClaimsProfileService>()
                .AddTransient<IRedirectUriValidator, RedirectUriValidator>()
                .AddTransient<IMailTemplateService, MailTemplateService>()
                .AddTransient<IMailService, MailService>()
                .AddTransient<IGoogleExternalAuthenticationConfiguration, GoogleExternalAuthenticationConfiguration>()
                .AddSingleton(CreatMapperConfig());

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "IdentityServer API", Version = "v1" });
            });

            // In production, the Angular files will be served from this directory
            if(!_environment.IsDevelopment())
                services.AddSpaStaticFiles(configuration => { configuration.RootPath = "authentication-frontend/dist"; });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (_environment.IsDevelopment()){
                app.UseDeveloperExceptionPage();
                // https://stackoverflow.com/questions/51912757/identity-server-is-keep-showing-showing-login-user-is-not-authenticated-in-c
                app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Lax });
            }
            
            AuthenticationFrontendSetup(app);
            InitializeDatabase(app);

            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "IdentityServer API v.1.0.0"); });
            
            app.UseRouting();
            app.UseCors(CorsDefinition);
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            _configuration = configuration;
            _environment = environment;
        }

        private static IMapper CreatMapperConfig()
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AuthProfile());
            });

            var mapper = mappingConfig.CreateMapper();
            return mapper;
        }

        private static void AuthenticationFrontendSetup(IApplicationBuilder app)
        {
            app.UseStaticFiles();
            
            app.Map(new PathString("/login"), client =>
            {
                var frontendLoginOptions = new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(
                        Path.Combine(Directory.GetCurrentDirectory(), @"authentication-frontend", "dist")
                    )
                };

                client.UseSpaStaticFiles(frontendLoginOptions);
                client.UseSpa(spa =>
                {
                    spa.Options.DefaultPage = "/index.html";
                    spa.Options.SourcePath = "authentication-frontend";
                    spa.Options.DefaultPageStaticFileOptions = frontendLoginOptions;
                });
            });
        }
        
        private static void InitializeDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();
                serviceScope.ServiceProvider.GetRequiredService<UserContext>().Database.Migrate();

                var context = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();

                context.Database.Migrate();
                if (!context.Clients.Any())
                {
                    foreach (var client in IdentitySeedData.GetClients())
                    {
                        context.Clients.Add(client.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.IdentityResources.Any())
                {
                    foreach (var resource in IdentitySeedData.GetIdentityResources())
                    {
                        context.IdentityResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
                
                if (!context.ApiResources.Any())
                {
                    foreach (var resource in IdentitySeedData.GetIdentityApis)
                    {
                        context.ApiResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
            }
        }
    }
}