using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
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
    public class JobApplicationsControllerTests
    {
        private async Task<AppDbContext> GetDbContext()
        {

            var option = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var dbContext = new AppDbContext(option);
            dbContext.Database.EnsureCreated();
            if (await dbContext.JobApplication.CountAsync() <= 0)
            {
                for (int i = 1; i <= 10; i++)
                {
                    dbContext.JobApplication.Add(new JobApplication()
                    {
                        Id = i,
                        Email = $"testuser{i}@example.com",
                        Description = "SYSTEM",
                        JobType = "jobas"
                    });
                    await dbContext.SaveChangesAsync();
                }
            }


            return dbContext;
        }
        [Fact]
        public async Task GetJobApplication_ShouldReturn_AllApplications_WhenNoArgument()
        {
            // Arrange
            var dbContext = await GetDbContext();
            var jobApplicationsController = new JobApplicationsController(dbContext);


            // Act
            var result = await jobApplicationsController.GetJobApplication();

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

        public async Task GetJobApplication_Should_Return_CorrectAmount_OfApplications(int additionalamount)
        {
            var dbContext = await GetDbContext();
            var jobApplicationsController = new JobApplicationsController(dbContext);
            for (int i = 1; i <= additionalamount; i++)
            {
                dbContext.JobApplication.Add(new JobApplication()
                {
                    Id = 10+i,
                    Email = $"testuser{i}@example.com",
                    Description = "SYSTEM",
                    JobType = "jobas"
                });
                await dbContext.SaveChangesAsync();
            }

            // Act
            var result = await jobApplicationsController.GetJobApplication();

            Assert.NotNull(result.Value);
            Assert.Equal(additionalamount + 10, result.Value.Count());
        }
        [Fact]
        public async Task PostJobApplication_Posts_Successfully()
        {
            var dbContext = await GetDbContext();
            var jobApplicationsController = new JobApplicationsController(dbContext);

            var application = new JobApplication()
            {
                Id = 55,
                Email = "testemail",
                Description = "testdescription",
                JobType = "testJobType"
            };

            var result = await jobApplicationsController.PostJobApplication(application);

            Assert.NotNull(result.Result);
        }
        [Fact]
        public async Task DeletesJobApplication_Returns_204()
        {
            var dbContext = await GetDbContext();
            var jobApplicationsController = new JobApplicationsController(dbContext);

            var result = await jobApplicationsController.DeleteJobApplication(1);
            var test = result as NoContentResult;
            Assert.Equal((double)HttpStatusCode.NoContent, test.StatusCode);
        }

       
    }
}
