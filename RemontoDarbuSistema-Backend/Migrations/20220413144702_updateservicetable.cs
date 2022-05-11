using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RemontoDarbuSistema_Backend.Migrations
{
    public partial class updateservicetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Service_Users_UserId",
                table: "Service");

            migrationBuilder.DropIndex(
                name: "IX_Service_UserId",
                table: "Service");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Service");

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "Service",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Service");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Service",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Service_UserId",
                table: "Service",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Service_Users_UserId",
                table: "Service",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
