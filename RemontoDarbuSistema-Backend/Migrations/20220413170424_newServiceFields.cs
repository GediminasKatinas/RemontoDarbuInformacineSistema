using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RemontoDarbuSistema_Backend.Migrations
{
    public partial class newServiceFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Service",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactEmail",
                table: "Service",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Service",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Service");

            migrationBuilder.DropColumn(
                name: "ContactEmail",
                table: "Service");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Service");
        }
    }
}
