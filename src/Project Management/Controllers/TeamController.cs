using System;
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
        public void AddMember(NewTeamMember newTeamMember)
        {
            db.TeamUserMappings.Add(new TeamUserMapping
            {
                CreatedDate = DateTime.UtcNow,
                TeamId = newTeamMember.TeamId,
                UserId = newTeamMember.UserId
            });
            db.SaveChanges();
        }
    }
}