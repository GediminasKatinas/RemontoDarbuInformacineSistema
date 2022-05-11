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
    public class MessagesControllerTests
    {
        private async Task<AppDbContext> GetDbContext()
        {

            var option = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var dbContext = new AppDbContext(option);
            dbContext.Database.EnsureCreated();
            if (await dbContext.Message.CountAsync() <= 0)
            {
                for (int i = 1; i <= 10; i++)
                {
                    dbContext.Message.Add(new Message()
                    {
                        Id = i,
                        Email = $"testuser{i}@example.com",
                        Messsage = "SYSTEM",
                        Name = "vardas"
                    });
                    await dbContext.SaveChangesAsync();
                }
            }


            return dbContext;
        }

        [Fact]
        public async Task GetMessage_ShouldReturn_AllApplications_WhenNoArgument()
        {
            // Arrange
            var dbContext = await GetDbContext();
            var messageController = new MessagesController(dbContext);


            // Act
            var result = await messageController.GetMessage();

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

        public async Task GetMessages_Should_Return_CorrectAmount_OfMessages(int additionalamount)
        {
            var dbContext = await GetDbContext();
            var messageController = new MessagesController(dbContext);
            for (int i = 1; i <= additionalamount; i++)
            {
                dbContext.Message.Add(new Message()
                {
                    Id = 10 + i,
                    Email = $"testuser{i}@example.com",
                    Messsage = "SYSTEM",
                    Name = "vardas"
                });
                await dbContext.SaveChangesAsync();
            }

            // Acts
            var result = await messageController.GetMessage();

            Assert.NotNull(result.Value);
            Assert.Equal(additionalamount + 10, result.Value.Count());
        }
        [Fact]
        public async Task PostMessage_Posts_Successfully()
        {
            var dbContext = await GetDbContext();
            var messageController = new MessagesController(dbContext);
           var message = new Message()
            {
                Id = 55,
                Email = $"testuser55@example.com",
                Messsage = "SYSTEM",
                Name = "vardas"
            };

            var result = await messageController.PostMessage(message);

            Assert.NotNull(result.Result);
        }
        [Fact]
        public async Task DeletesMessage_Returns_204()
        {
            var dbContext = await GetDbContext();
            var messageController = new MessagesController(dbContext);
            var result = await messageController.DeleteMessage(1);
            var test = result as NoContentResult;
            Assert.Equal((double)HttpStatusCode.NoContent, test.StatusCode);
        }
    }
}
