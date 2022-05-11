using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RemontoDarbuSistema_Backend.Migrations
{
    public partial class serviceI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ServiceId",
                table: "UserReservation",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ServiceId",
                table: "UserReservation");
        }
    }
}
