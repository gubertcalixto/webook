using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityServer.Infrastructure.Migrations
{
    public partial class Add_ExternalAuthLink_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ExternalLoginProvider",
                table: "User",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ExternalAuthenticationLinks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AccessToken = table.Column<string>(nullable: true),
                    RefreshToken = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false),
                    AccessTokenExpiresDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExternalAuthenticationLinks", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExternalAuthenticationLinks");

            migrationBuilder.DropColumn(
                name: "ExternalLoginProvider",
                table: "User");
        }
    }
}
