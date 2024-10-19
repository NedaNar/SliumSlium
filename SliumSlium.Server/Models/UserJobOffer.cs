using System.Text.Json.Serialization;

namespace SliumSlium.Server.Models
{
    public class UserJobOffer
    {
        public int Id_UserJobOffer { get; set; }
        public string Status { get; set; }
        public DateTime ApplicationDate { get; set; }
        public int CurrentPart { get; set; }

        public int Fk_JobOfferid_JobOffer { get; set; }

        [JsonIgnore]
        public JobOffer JobOffer { get; set; }

        public int Fk_Userid_User { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
