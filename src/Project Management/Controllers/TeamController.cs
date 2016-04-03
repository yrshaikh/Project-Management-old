using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Project_Management.Data;
using Project_Management.Models.Team;

namespace Project_Management.Controllers
{
    public class TeamController : Controller
    {
        private ProjectManagementDbEntities db = new ProjectManagementDbEntities();
        // GET: Team
        public ActionResult Index()
        {
            string userId = User.Identity.GetUserId();
            List<TeamModel> teamModel = db.TeamUserMappings
                .Include(x => x.Team)
                .Where(x => x.UserId == userId)
                .Select(x => new TeamModel
                {
                    Id = x.TeamId,
                    Name = x.Team.Name
                })
                .ToList();
            ViewBag.Teams = teamModel;
            return View();
        }
    }
}