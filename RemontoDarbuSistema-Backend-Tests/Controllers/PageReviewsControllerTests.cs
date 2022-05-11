using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RemontoDarbuSistema_Backend.Controllers;
using RemontoDarbuSistema_Backend.Models;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace RemontoDarbuSistema_Backend_Tests.Controllers
{
    public class PageReviewsControllerTests
    {
        private async Task<AppDbContext> GetDbContext()
        {

            var option = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var dbContext = new AppDbContext(option);
            dbContext.Database.EnsureCreated();
            if (await dbContext.PageReview.CountAsync() <= 0)
            {
                for (int i = 1; i <= 10; i++)
                {
                    dbContext.PageReview.Add(new PageReview()
                    {
                        Id = i,
                        Email = $"testuser{i}@example.com",
                        Rating = i,
                        Name = "vardas"
                    });
                    await dbContext.SaveChangesAsync();
                }
            }


            return dbContext;
        }

        [Fact]
        public async Task GetPageReview_ShouldReturn_AllReviews_WhenNoArgument()
        {
            // Arrange
            var dbContext = await GetDbContext();
            var pageReviewsController = new PageReviewsController(dbContext);


            // Act
            var result = await pageReviewsController.GetPageReview();

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

        public async Task GetPageReviews_Should_Return_CorrectAmount_OfPageReviews(int additionalamount)
        {
            var dbContext = await GetDbContext();
            var pageReviewsController = new PageReviewsController(dbContext);
            for (int i = 1; i <= additionalamount; i++)
            {
                dbContext.PageReview.Add(new PageReview()
                {
                    Id = 10 + i,
                    Email = $"testuser{i}@example.com",
                    Rating = i,
                    Name = "vardas"
                });
                await dbContext.SaveChangesAsync();
            }

            // Acts
            var result = await pageReviewsController.GetPageReview();

            Assert.NotNull(result.Value);
            Assert.Equal(additionalamount + 10, result.Value.Count());
        }
        [Fact]
        public async Task PostPageReview_Posts_Successfully()
        {
            var dbContext = await GetDbContext();
            var pageReviewsController = new PageReviewsController(dbContext);
            var pageReview = new PageReview()
            {
                Id = 55,
                Email = $"testuser55@example.com",
                Rating = 10,
                Name = "vardas"
            };

            var result = await pageReviewsController.PostPageReview(pageReview);

            Assert.NotNull(result.Result);
        }
        [Fact]
        public async Task DeletesPageReview_Returns_204()
        {
            var dbContext = await GetDbContext();
            var pageReviewsController = new PageReviewsController(dbContext);
            var result = await pageReviewsController.DeletePageReview(1);
            var test = result as NoContentResult;
            Assert.Equal((double)HttpStatusCode.NoContent, test.StatusCode);
        }
    }
}
