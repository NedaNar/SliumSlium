using System.ComponentModel.DataAnnotations.Schema;

namespace SliumSlium.Server.Models
{
    public class Upload
    {
        [Column("id_File")]
        public int Id { get; set; }
        public string FilePath { get; set; }
        public DateTime UploadDate { get; set; }

        [Column("fk_Partid_Part")]
        public int PartId { get; set; } 
        public Part? Part { get; set; }

        [Column("fk_Userid_User")]
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
