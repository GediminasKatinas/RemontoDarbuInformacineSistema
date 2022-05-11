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
    public class UsersControllerTests
    {
        private async Task<AppDbContext> GetDbContext()
        {

            var option = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var dbContext = new AppDbContext(option);
            dbContext.Database.EnsureCreated();
            if (await dbContext.Users.CountAsync() <= 0)
            {
                for (int i = 1; i <= 10; i++)
                {
                    dbContext.Users.Add(new User()
                    {
                        Id = i,
                        Email = "test",
                        Password = "P@ssW0rd",
                        Role = "admin",
                        Username = "jonukas"
                    });
                    await dbContext.SaveChangesAsync();
                }
            }


            return dbContext;
        }

        [Fact]
        public async Task GetUsers_ShouldReturn_AllUsers_WhenNoArgument()
        {
            // Arrange
            var dbContext = await GetDbContext();
            var usersController = new UsersController(dbContext);


            // Act
            var result = await usersController.GetUsers();

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

        public async Task GetUsers_Should_Return_CorrectAmount_OfUsers(int additionalamount)
        {
            var dbContext = await GetDbContext();
            var usersController = new UsersController(dbContext);
            for (int i = 1; i <= additionalamount; i++)
            {
                dbContext.Users.Add(new User()
                {
                    Id = i+10,
                    Email = "test",
                    Password = "P@ssW0rd",
                    Role = "admin",
                    Username = "jonukas"
                });
                await dbContext.SaveChangesAsync();
            }

            // Acts
            var result = await usersController.GetUsers();

            Assert.NotNull(result.Value);
            Assert.Equal(additionalamount + 10, result.Value.Count());
        }
        [Fact]
        public async Task PostUser_Posts_Successfully()
        {
            var dbContext = await GetDbContext();
            var usersController = new UsersController(dbContext);
            var user = new User()
            {
                Id = 55,
                Email = "test",
                Password = "P@ssW0rd",
                Role = "admin",
                Username = "jonukas"
            };

            var result = await usersController.PostUser(user);

            Assert.NotNull(result.Result);
        }
        [Fact]
        public async Task DeletesUser_Returns_204()
        {
            var dbContext = await GetDbContext();
            var userController = new UsersController(dbContext);
            var result = await userController.DeleteUser(1);
            var test = result as NoContentResult;
            Assert.Equal((double)HttpStatusCode.NoContent, test.StatusCode);
        }
        [Theory]
        [InlineData(true, "gedoska@gmail.com", "Admin")]
        [InlineData(false, "gedoska@gmail.com", "Meistras")]

        public async Task CheckIfUserIsAdmin_Returns_CorrectResponse(bool isAdmin, string email, string role)
        {
            var dbContext = await GetDbContext();
            dbContext.Users.Add(new User()
            {
                Id = 55,
                Email = email,
                Password = "P@ssW0rd",
                Role = role,
                Username = "jonukas"
            });
            await dbContext.SaveChangesAsync();
            var userController = new UsersController(dbContext);
            var result = await userController.IsAdmin(email);

            Assert.Equal(isAdmin, result.Value);
        }
        [Theory]
        [InlineData(false, "gedoska@gmail.com", "Admin")]
        [InlineData(true, "gedoska@gmail.com", "Meistras")]

        public async Task CheckIfUserIsMeistras_Returns_CorrectResponse(bool isMeistras, string email, string role)
        {
            var dbContext = await GetDbContext();
            dbContext.Users.Add(new User()
            {
                Id = 55,
                Email = email,
                Password = "P@ssW0rd",
                Role = role,
                Username = "jonukas"
            });
            await dbContext.SaveChangesAsync();
            var userController = new UsersController(dbContext);
            var result = await userController.IsMeistras(email);

            Assert.Equal(isMeistras, result.Value);
        }
    }
}
