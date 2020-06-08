using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scrapbook.Infrastructure.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContactForms",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    SubjectType = table.Column<int>(nullable: false),
                    Subject = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Body = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactForms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DocumentAccess = table.Column<int>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EditorAreas",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorAreas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EditorComponentFavorites",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EditorComponentId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorComponentFavorites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EditorDocumentAccesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DocumentId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorDocumentAccesses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EditorInteractions",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ObjectTypeEnum = table.Column<int>(nullable: false),
                    ObjectId = table.Column<Guid>(nullable: false),
                    InteractionTypeEnum = table.Column<int>(nullable: false),
                    InteractionId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorInteractions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EditorPlugins",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DownloadNumber = table.Column<int>(nullable: false),
                    IsDefault = table.Column<bool>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorPlugins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserFollows",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FollowedPersonId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFollows", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPreferences",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Language = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPreferences", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DocumentPages",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EditorDocumentId = table.Column<Guid>(nullable: false),
                    PageNumber = table.Column<int>(nullable: false),
                    PreviewImage = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentPages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentPages_Documents_EditorDocumentId",
                        column: x => x.EditorDocumentId,
                        principalTable: "Documents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EditorAreaUserTemplates",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    EditorAreaId = table.Column<Guid>(nullable: false),
                    HasFixedPosition = table.Column<bool>(nullable: false),
                    FixedPosition = table.Column<int>(nullable: true),
                    CoordinateX = table.Column<double>(nullable: true),
                    CoordinateY = table.Column<double>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorAreaUserTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EditorAreaUserTemplates_EditorAreas_EditorAreaId",
                        column: x => x.EditorAreaId,
                        principalTable: "EditorAreas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EditorComponents",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    PluginId = table.Column<Guid>(nullable: false),
                    EditorPluginId = table.Column<Guid>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Icon = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorComponents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EditorComponents_EditorPlugins_EditorPluginId",
                        column: x => x.EditorPluginId,
                        principalTable: "EditorPlugins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EditorComponentInstances",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ComponentId = table.Column<Guid>(nullable: false),
                    EditorComponentId = table.Column<Guid>(nullable: true),
                    EditorDocumentId = table.Column<Guid>(nullable: false),
                    DocumentPageId = table.Column<Guid>(nullable: true),
                    CoordinateX = table.Column<double>(nullable: true),
                    CoordinateY = table.Column<double>(nullable: true),
                    Width = table.Column<double>(nullable: true),
                    Height = table.Column<double>(nullable: true),
                    ZIndex = table.Column<int>(nullable: true),
                    Data = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EditorComponentInstances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EditorComponentInstances_DocumentPages_DocumentPageId",
                        column: x => x.DocumentPageId,
                        principalTable: "DocumentPages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EditorComponentInstances_EditorComponents_EditorComponentId",
                        column: x => x.EditorComponentId,
                        principalTable: "EditorComponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DocumentPages_EditorDocumentId",
                table: "DocumentPages",
                column: "EditorDocumentId");

            migrationBuilder.CreateIndex(
                name: "IX_EditorAreaUserTemplates_EditorAreaId",
                table: "EditorAreaUserTemplates",
                column: "EditorAreaId");

            migrationBuilder.CreateIndex(
                name: "IX_EditorComponentInstances_DocumentPageId",
                table: "EditorComponentInstances",
                column: "DocumentPageId");

            migrationBuilder.CreateIndex(
                name: "IX_EditorComponentInstances_EditorComponentId",
                table: "EditorComponentInstances",
                column: "EditorComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_EditorComponents_EditorPluginId",
                table: "EditorComponents",
                column: "EditorPluginId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactForms");

            migrationBuilder.DropTable(
                name: "EditorAreaUserTemplates");

            migrationBuilder.DropTable(
                name: "EditorComponentFavorites");

            migrationBuilder.DropTable(
                name: "EditorComponentInstances");

            migrationBuilder.DropTable(
                name: "EditorDocumentAccesses");

            migrationBuilder.DropTable(
                name: "EditorInteractions");

            migrationBuilder.DropTable(
                name: "UserFollows");

            migrationBuilder.DropTable(
                name: "UserPreferences");

            migrationBuilder.DropTable(
                name: "EditorAreas");

            migrationBuilder.DropTable(
                name: "DocumentPages");

            migrationBuilder.DropTable(
                name: "EditorComponents");

            migrationBuilder.DropTable(
                name: "Documents");

            migrationBuilder.DropTable(
                name: "EditorPlugins");
        }
    }
}
