using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RemontoDarbuSistema_Backend.Models;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;

namespace RemontoDarbuSistema_Backend_Tests.Helpers
{
    public class TestHelper
    {
        private readonly AppDbContext appDbContext;

        public AppDbContext GetDbContext()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var option = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlite(connection)
                .Options;
            var dbContext = new AppDbContext(option);

            //Added to recreate database and run migration for each test.
            if (dbContext != null)
            {
                dbContext.Database.EnsureDeleted();
                dbContext.Database.EnsureCreated();
            }

            return dbContext;
        }
    }
}
