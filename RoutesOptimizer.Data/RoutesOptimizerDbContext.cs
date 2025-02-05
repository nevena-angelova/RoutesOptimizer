using Microsoft.EntityFrameworkCore;
using RoutesOptimizer.Data.Models;

namespace RoutesOptimizer.Data
{
    public class RoutesOptimizerDbContext : DbContext
    {
        public RoutesOptimizerDbContext(DbContextOptions<RoutesOptimizerDbContext> options)
       : base(options)
        {
        }

        public DbSet<Stop> Stops { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Stop>()
                .Property(e => e.Latitude)
                .HasPrecision(18, 15);

            modelBuilder.Entity<Stop>()
                 .Property(e => e.Longitude)
                 .HasPrecision(18, 15);
        }
    }
}
