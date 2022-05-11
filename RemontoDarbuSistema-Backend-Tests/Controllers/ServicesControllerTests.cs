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
    public class ServicesControllerTests
    {
        private async Task<AppDbContext> GetDbContext()
        {

            var option = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var dbContext = new AppDbContext(option);
            dbContext.Database.EnsureCreated();
            if (await dbContext.Service.CountAsync() <= 0)
            {
                for (int i = 1; i <= 10; i++)
                {
                    dbContext.Service.Add(new Service()
                    {
                        Id = i,
                        Name = "test",
                        PhoneNumber = "test",
                        City = "Utena"
                    });
                    await dbContext.SaveChangesAsync();
                }
            }


            return dbContext;
        }

        [Fact]
        public async Task GetService_ShouldReturn_AllServices_WhenNoArgument()
        {
            // Arrange
            var dbContext = await GetDbContext();
            var servicesController = new ServicesController(dbContext);


            // Act
            var result = await servicesController.GetService();

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

        public async Task GetServices_Should_Return_CorrectAmount_OfServices(int additionalamount)
        {
            var dbContext = await GetDbContext();
            var servicesController = new ServicesController(dbContext);
            for (int i = 1; i <= additionalamount; i++)
            {
                dbContext.Service.Add(new Service()
                {
                        Id = i+10,
                        Name = "test",
                        PhoneNumber = "test",
                        City = "Utena"
                });
                await dbContext.SaveChangesAsync();
            }

            // Acts
            var result = await servicesController.GetService();

            Assert.NotNull(result.Value);
            Assert.Equal(additionalamount + 10, result.Value.Count());
        }
        [Fact]
        public async Task PostService_Posts_Successfully()
        {
            var dbContext = await GetDbContext();
            var servicesController = new ServicesController(dbContext);
            var service = new Service()
            {
                Id = 55,
                Name = "test",
                PhoneNumber = "test",
                City = "Utena"
            };

            var result = await servicesController.PostService(service);

            Assert.NotNull(result.Result);
        }
        [Fact]
        public async Task DeletesService_Returns_204()
        {
            var dbContext = await GetDbContext();
            var servicesController = new ServicesController(dbContext);
            var result = await servicesController.DeleteService(1);
            var test = result as NoContentResult;
            Assert.Equal((double)HttpStatusCode.NoContent, test.StatusCode);
        }
    }
}
