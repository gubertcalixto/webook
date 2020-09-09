using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scrapbook.Infrastructure.Migrations
{
    public partial class Add_DocumentTags_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DocumentTags",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TagName = table.Column<string>(nullable: true),
                    EditorDocumentId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentTags_Documents_EditorDocumentId",
                        column: x => x.EditorDocumentId,
                        principalTable: "Documents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocumentTags_EditorDocumentId",
                table: "DocumentTags",
                column: "EditorDocumentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DocumentTags");
        }
    }
}
