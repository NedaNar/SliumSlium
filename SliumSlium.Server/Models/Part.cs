﻿using System.Text.Json.Serialization;

namespace SliumSlium.Server.Models
{
    public class Part
    {
        public int Id_Part { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool RequiresFiles { get; set; }

        public int Fk_JobOfferId_JobOffer { get; set; }

        [JsonIgnore]
        public JobOffer? JobOffer { get; set; }

        public ICollection<Upload> Uploads { get; set; } = new List<Upload>();
    }
}
