cd .\IdentityServer.Infrastructure\
dotnet ef migrations add "" -s ..\IdentityServer.Host\ --context UserContext
dotnet ef database update -s ..\IdentityServer.Host\ --context UserContext

dotnet ef migrations remove -s ..\IdentityServer.Host\ --context UserContext

// The EF Core tools version '3.1.2' is older than that of the runtime '3.1.3'. Update the tools for the latest features and bug fixes.
dotnet tool update --global dotnet-ef --version 3.1.3

