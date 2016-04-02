using System.ComponentModel.DataAnnotations;

namespace Project_Management.Models.Team
{
    public class CreateTeamModel
    {
        [Required]
        public string Name { get; set; }
    }
}