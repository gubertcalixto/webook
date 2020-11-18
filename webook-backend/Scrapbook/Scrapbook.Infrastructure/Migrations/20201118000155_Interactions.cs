using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scrapbook.Infrastructure.Migrations
{
    public partial class Interactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EditorInteractions");

            migrationBuilder.CreateTable(
                name: "EditorInteractionComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ObjectTypeEnum = table.Column<int>(nullable: false),
                    ObjectId = table.Column<Guid>(nullable: false),
                    InteractionTypeEnum = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    InteractionId = table.Column<Guid>(nullable: false),
                    Message = table.Column<string>(nullable: true),
                    ParentId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorInteractionComments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EditorInteractionDislikes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ObjectTypeEnum = table.Column<int>(nullable: false),
                    ObjectId = table.Column<Guid>(nullable: false),
                    InteractionTypeEnum = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorInteractionDislikes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EditorInteractionLikes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ObjectTypeEnum = table.Column<int>(nullable: false),
                    ObjectId = table.Column<Guid>(nullable: false),
                    InteractionTypeEnum = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorInteractionLikes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EditorInteractionComments");

            migrationBuilder.DropTable(
                name: "EditorInteractionDislikes");

            migrationBuilder.DropTable(
                name: "EditorInteractionLikes");

            migrationBuilder.CreateTable(
                name: "EditorInteractions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InteractionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InteractionTypeEnum = table.Column<int>(type: "int", nullable: false),
                    ObjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ObjectTypeEnum = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorInteractions", x => x.Id);
                });
        }
    }
}
