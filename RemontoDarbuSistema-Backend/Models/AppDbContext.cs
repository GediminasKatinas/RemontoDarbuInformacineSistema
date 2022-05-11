using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace RemontoDarbuSistema_Backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<JobApplication> JobApplication { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<PageReview> PageReview { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<Reservation> Reservation { get; set; }
        public DbSet<ReservationTimes> ReservationTimes { get; set; }
        public DbSet<UserReservation> UserReservation { get; set; }




    }

}
