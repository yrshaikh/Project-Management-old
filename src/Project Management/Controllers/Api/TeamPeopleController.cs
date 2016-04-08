using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using Project_Management.Data;
using Project_Management.Models.Team;

namespace Project_Management.Controllers.Api
{
    public class TeamPeopleController : ApiController
    {
        private ProjectManagementDbEntities db = new ProjectManagementDbEntities();
        // id - here is the teamid
        public List<TeamMembers> Get(int id)
        {
            List<TeamUserMapping> teamUserMappings = db.TeamUserMappings
                .Include(x => x.AspNetUser)
                .Where(x => x.TeamId == id)
                .ToList();

            List<TeamMembers> teamMembers = teamUserMappings.Select(x => new TeamMembers
            {
                Name = string.Format("{0} {1}", x.AspNetUser.FirstName, x.AspNetUser.LastName),
                Email = x.AspNetUser.Email
            }).ToList();
            return teamMembers;
        }
    }
}
