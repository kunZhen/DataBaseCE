using BackEnd.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.API.Data
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ChrisPr> ChrisPrs { get; set; }
    }
}
