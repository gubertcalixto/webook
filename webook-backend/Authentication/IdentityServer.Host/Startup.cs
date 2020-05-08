﻿using System.IO;
using System.Linq;
using System.Reflection;
using IdentityServer.IdentityControllers.Profile;
using IdentityServer.IdentityServerConfig;
using IdentityServer.Infrastructure.EntityFrameworkCore;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
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

        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            _configuration = configuration;
            _environment = environment;
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            var migrationsAssembly = typeof(UserContext).GetTypeInfo().Assembly.GetName().Name;
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            services.AddIdentityServer(opt =>
                {
                    if (!_environment.IsDevelopment()) return;
                    opt.Events.RaiseErrorEvents = true;
                    opt.Events.RaiseInformationEvents = true;
                    opt.Events.RaiseFailureEvents = true;
                    opt.Events.RaiseSuccessEvents = true;
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
                
                    // enables automatic token cleanup
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 30;
                })
                // TODO Check if is needed
                .AddDeveloperSigningCredential();
            
            services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();
            services.AddTransient<IProfileService, IdentityClaimsProfileService>();
            
            // Db Setup
            services.AddUserDbContext();

            services.AddAuthentication();
                // TODO Add Google Authentication
                // .AddGoogle("Google", options =>
                // {
                //     options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                //
                //     options.ClientId = "<insert here>";
                //     options.ClientSecret = "<insert here>";
                // });
                services.AddMvc();
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
            if (_environment.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
                app.UseExceptionHandler("/error");

            // https://stackoverflow.com/questions/51912757/identity-server-is-keep-showing-showing-login-user-is-not-authenticated-in-c
            if (env.IsDevelopment())
                app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Lax });
            
            // AuthenticationFrontendSetup(app);
            InitializeDatabase(app);

            if (_environment.IsDevelopment())
            {
                app.UseCors(opts =>
                {
                    opts.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                });
            }
            else
            {
                // TODO: Setup Production
                app.UseCors();
            }
            
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "IdentityServer API v.1.0.0"); });
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseIdentityServer();
            app.UseAuthentication();
        }

        private void AuthenticationFrontendSetup(IApplicationBuilder app)
        {
            app.UseStaticFiles();
            
            app.Map(new PathString("/app"), client =>
            {
                if (!_environment.IsDevelopment())
                {
                    var clientAppDist = new StaticFileOptions
                    {
                        FileProvider = new PhysicalFileProvider(
                            Path.Combine(Directory.GetCurrentDirectory(), @"LoginApp", "dist")
                        )
                    };

                    client.UseSpaStaticFiles(clientAppDist);
                    client.UseSpa(spa =>
                    {
                        spa.Options.DefaultPage = "/index.html";
                        spa.Options.SourcePath = "LoginApp";
                        spa.Options.DefaultPageStaticFileOptions = clientAppDist;
                    });
                }
                else
                {
                    app.UseSpa(spa =>
                    {
                        spa.Options.SourcePath = "authentication-frontend";
                        if (_environment.IsDevelopment())
                        {
                            spa.UseAngularCliServer(npmScript: "start");
                        }
                    });
                }
            });
        }
        
        private void InitializeDatabase(IApplicationBuilder app)
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
            }
        }
    }
}