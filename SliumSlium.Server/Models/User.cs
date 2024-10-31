using System.Collections;
using System.Text.Json.Serialization;

namespace SliumSlium.Server.Models
{
    public class User
    {
        public int Id_User { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Type { get; set; }

        [JsonIgnore]
        public ICollection<JobOffer> JobOffers { get; set; } = new List<JobOffer>();

        [JsonIgnore]
        public ICollection<Upload> Uploads { get; set; } = new List<Upload>();
    }
}
