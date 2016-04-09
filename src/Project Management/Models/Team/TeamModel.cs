using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Project_Management.Models.Team
{
    public class TeamModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("u")]
        public string LastUpdated { get; set; }

        [JsonProperty("m")]
        public List<TeamMembers> Members { get; set; } 
    }

    public class TeamMembers
    {
        [JsonProperty("n")]
        public string Name { get; set; }

        [JsonProperty("e")]
        public string Email { get; set; }

        public int MapId { get; set; }
    }
}