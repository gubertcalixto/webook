using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scrapbook.Infrastructure.Migrations
{
    public partial class Added_PageData_To_DocumentPage_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "PageData",
                table: "DocumentPages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PageData",
                table: "DocumentPages");
        }
    }
}
