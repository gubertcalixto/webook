using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scrapbook.Infrastructure.Migrations
{
    public partial class Add_Creation_and_LastUpdate_To_Document : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "Documents",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdateTime",
                table: "Documents",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "LastUpdateTime",
                table: "Documents");
        }
    }
}
