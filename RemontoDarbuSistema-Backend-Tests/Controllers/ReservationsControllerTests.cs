using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RemontoDarbuSistema_Backend.Controllers;
using RemontoDarbuSistema_Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace RemontoDarbuSistema_Backend_Tests.Controllers
{
    public class ReservationsControllerTests
    {
        private async Task<AppDbContext> GetDbContext()
        {

            var option = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var dbContext = new AppDbContext(option);
            dbContext.Database.EnsureCreated();
            if (await dbContext.Reservation.CountAsync() <= 0)
            {
                for (int i = 1; i <= 10; i++)
                {
                    dbContext.Reservation.Add(new Reservation()
                    {
                        Id = i,
                        UserId = i,
                        ReservationTimes = new List<ReservationTimes>()
                    }) ;
                    await dbContext.SaveChangesAsync();
                }
            }


            return dbContext;
        }

        [Fact]
        public async Task GetReservation_ShouldReturn_AllReservations_WhenNoArgument()
        {
            // Arrange
            var dbContext = await GetDbContext();
            var reservationsController = new ReservationsController(dbContext);


            // Act
            var result = await reservationsController.GetReservation();

            // Assert
            Assert.NotNull(result.Value);
        }
        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        [InlineData(7)]

        public async Task GetReservations_Should_Return_CorrectAmount_OfReservations(int additionalamount)
        {
            var dbContext = await GetDbContext();
            var reservationsController = new ReservationsController(dbContext);
            for (int i = 1; i <= additionalamount; i++)
            {
                dbContext.Reservation.Add(new Reservation()
                {
                    Id = i+10,
                    UserId = i,
                    ReservationTimes = new List<ReservationTimes>()
                });
                await dbContext.SaveChangesAsync();
            }

            // Acts
            var result = await reservationsController.GetReservation();

            Assert.NotNull(result.Value);
            Assert.Equal(additionalamount + 10, result.Value.Count());
        }
        [Fact]
        public async Task PostReservation_Posts_Successfully()
        {
            var dbContext = await GetDbContext();
            var reservationsController = new ReservationsController(dbContext);
            var reservation = new Reservation()
            {
                Id = 55,
                UserId = 55,
                ReservationTimes = new List<ReservationTimes>()
            };

            var result = await reservationsController.PostReservation(reservation);

            Assert.NotNull(result.Result);
        }
        [Fact]
        public async Task DeletesReservation_Returns_204()
        {
            var dbContext = await GetDbContext();
            var reservationController = new ReservationsController(dbContext);
            var result = await reservationController.DeleteReservation(1);
            var test = result as NoContentResult;
            Assert.Equal((double)HttpStatusCode.NoContent, test.StatusCode);
        }
    }
}
