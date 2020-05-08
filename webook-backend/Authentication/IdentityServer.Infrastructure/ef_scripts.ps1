cd .\IdentityServer.Infrastructure\
dotnet ef migrations add "" -s ..\IdentityServer.Host\ --context UserContext
dotnet ef database update -s ..\IdentityServer.Host\ --context UserContext

dotnet ef migrations remove -s ..\IdentityServer.Host\ --context UserContext

// The EF Core tools version '3.1.2' is older than that of the runtime '3.1.3'. Update the tools for the latest features and bug fixes.
dotnet tool update --global dotnet-ef --version 3.1.3

// IdentityServer Configuration
dotnet ef migrations add InitialIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o Migrations/IdentityServer/PersistedGrantDb -s ..\IdentityServer.Host\
dotnet ef migrations add InitialIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o Migrations/IdentityServer/ConfigurationDb -s ..\IdentityServer.Host\
dotnet ef database update -c PersistedGrantDbContext -s ..\IdentityServer.Host\
dotnet ef database update -c ConfigurationDbContext -s ..\IdentityServer.Host\

