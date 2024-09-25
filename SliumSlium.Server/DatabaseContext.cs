using Microsoft.EntityFrameworkCore;
using SliumSlium.Models;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    // TODO Update with our items
    public DbSet<Item> Items { get; set; }
}