using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
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
            FillViewBagWithProjectList();
            return View();
        }

        public ActionResult O(int id)
        {
            List<TeamModel> teamModel = FillViewBagWithProjectList();
            ViewBag.SelectedTeam = teamModel.FirstOrDefault(x => x.Id == id);
            return View("Index");
        }

        private List<TeamModel> FillViewBagWithProjectList()
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
            return teamModel;
        }

        public JsonResult GetNonMembersForAutocomplete(int teamId)
        {
            List<string> members = db.TeamUserMappings.Where(x => x.TeamId == teamId).Select(x => x.UserId).ToList();

            var nonMembers = db.AspNetUsers
                .Where(x => !members.Contains(x.Id))
                .Select(x => new
                {
                    id = x.Id,
                    text = x.FirstName + " " + x.LastName + "(" + x.Email + ")",
                    name = x.FirstName + " " + x.LastName,
                    email = x.Email
                }).ToList();

            return Json(nonMembers, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<TeamModel> Get(int id)
        {
            Team team = await db.Teams.FirstOrDefaultAsync(x => x.Id == id);
            return new TeamModel
            {
                Id = team.Id,
                Name = team.Name
            };
        }

        [HttpPost]
        public async Task<ActionResult> AddMember(NewTeamMember newTeamMember)
        {
            db.TeamUserMappings.Add(new TeamUserMapping
            {
                CreatedDate = DateTime.UtcNow,
                TeamId = newTeamMember.TeamId,
                UserId = newTeamMember.UserId
            });
            await db.SaveChangesAsync();
            return null;
        }

        [HttpPost]
        public async Task<ActionResult> DeleteMember(DeleteTeamMember deleteTeamMember)
        {
            TeamUserMapping userMapping = db.TeamUserMappings.FirstOrDefault(x => x.MapId == deleteTeamMember.MapId);
            db.TeamUserMappings.Remove(userMapping);
            await db.SaveChangesAsync();
            return null;
        }
    }
}