using Microsoft.EntityFrameworkCore.Migrations;

namespace Scrapbook.Infrastructure.Migrations
{
    public partial class UpdatingUserPreferencesEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Language",
                table: "UserPreferences");

            migrationBuilder.AddColumn<bool>(
                name: "AutoplayAudios",
                table: "UserPreferences",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "AutoplayVideos",
                table: "UserPreferences",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InvisibleMode",
                table: "UserPreferences",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "NewsletterActivated",
                table: "UserPreferences",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "DocumentAccess",
                table: "Documents",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AutoplayAudios",
                table: "UserPreferences");

            migrationBuilder.DropColumn(
                name: "AutoplayVideos",
                table: "UserPreferences");

            migrationBuilder.DropColumn(
                name: "InvisibleMode",
                table: "UserPreferences");

            migrationBuilder.DropColumn(
                name: "NewsletterActivated",
                table: "UserPreferences");

            migrationBuilder.AddColumn<int>(
                name: "Language",
                table: "UserPreferences",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "DocumentAccess",
                table: "Documents",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
