using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SliumSlium.Models
{
    // TODO Delete - example class

    [Table("item")]
    public class Item
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [StringLength(255)]
        public string Img { get; set; }

        public double Price { get; set; }

        public int ItemCount { get; set; }

        [StringLength(1000)]
        public string Descr { get; set; }

        [Required]
        [Column(TypeName = "char(7)")]
        public string Category { get; set; }

        public static readonly string[] ValidCategories = ["Sticker", "Tshirt", "Jumper", "Print"];

        public void Validate()
        {
            if (!ValidCategories.Contains(Category))
            {
                throw new ArgumentException($"Category must be one of the following: {string.Join(", ", ValidCategories)}");
            }
        }
    }
}