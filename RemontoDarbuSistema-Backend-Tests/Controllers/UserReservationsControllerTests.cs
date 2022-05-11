using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using RemontoDarbuSistema_Backend.Controllers;
using RemontoDarbuSistema_Backend.Models;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace RemontoDarbuSistema_Backend_Tests.Controllers
{
    public class UserReservationsControllerTests
    {
        private async Task<AppDbContext> GetDbContext()
        {

            var option = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var dbContext = new AppDbContext(option);
            dbContext.Database.EnsureCreated();
            if (await dbContext.UserReservation.CountAsync() <= 0)
            {
                for (int i = 1; i <= 10; i++)
                {
                    dbContext.UserReservation.Add(new UserReservation()
                    {
                        Id = i,
                        ServiceId = 55,
                        Status = "test",
                        Email = "testinis@gmail.com",
                        Price = 50
                    });
                    await dbContext.SaveChangesAsync();
                }
            }


            return dbContext;
        }

        [Fact]
        public async Task GetUserReservations_ShouldReturn_AllUserReservations_WhenNoArgument()
        {
            // Arrange
            var dbContext = await GetDbContext();
            var userReservationController = new UserReservationsController(dbContext);


            // Act
            var result = await userReservationController.GetUserReservation();

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

        public async Task GetUserReservations_Should_Return_CorrectAmount_OfReservations(int additionalamount)
        {
            var dbContext = await GetDbContext();
            var userReservationsController = new UserReservationsController(dbContext);
            for (int i = 1; i <= additionalamount; i++)
            {
                dbContext.UserReservation.Add(new UserReservation()
                {
                    Id = i+10,
                    ServiceId = 55,
                    Status = "test",
                    Email = "testinis@gmail.com",
                    Price = 50
                });
                await dbContext.SaveChangesAsync();
            }

            // Acts
            var result = await userReservationsController.GetUserReservation();

            Assert.NotNull(result.Value);
            Assert.Equal(additionalamount + 10, result.Value.Count());
        }
        [Fact]
        public async Task PostUserReservation_Posts_Successfully()
        {
            var dbContext = await GetDbContext();
            var userReservationsController = new UserReservationsController(dbContext);
            var userReservation = new UserReservation()
            {
                Id = 55,
                ServiceId = 55,
                Status = "test",
                Email = "testinis@gmail.com",
                Price = 50
            };

            var result = await userReservationsController.PostUserReservation(userReservation);

            Assert.NotNull(result.Result);
        }
        [Fact]
        public async Task DeletesReservation_Returns_204()
        {
            var dbContext = await GetDbContext();
            var userReservationsController = new UserReservationsController(dbContext);
            var result = await userReservationsController.DeleteUserReservation(1);
            var test = result as OkObjectResult;
            Assert.Equal((double)HttpStatusCode.OK, (double)test.StatusCode);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        [InlineData(7)]
        public async Task GetsUserReservationsByEmail_ShouldReturn_All_UserReservations(int reservationAmount)
        {
            var dbContext = await GetDbContext();
            for (int i = 1; i <= reservationAmount; i++)
            {
                dbContext.UserReservation.Add(new UserReservation()
                {
                    Id = i+10,
                    ServiceId = 55,
                    Status = "test",
                    Email = "gediminas@gmail.com",
                    Price = 50,
                    ServiceName = "testas"
                });
                await dbContext.SaveChangesAsync();
            }
            var userReservationsController = new UserReservationsController(dbContext);
            var result = await userReservationsController.GetUserReservationsByEmail("gediminas@gmail.com");

            Assert.Equal(reservationAmount, result.Value.Count());
        }
    }
}
