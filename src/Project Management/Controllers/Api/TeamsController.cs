using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Project_Management.Data;
using Project_Management.Models.Team;
using Project_Management.Utils.Date;

namespace Project_Management.Controllers.Api
{
    public class TeamsController : ApiController
    {
        private ProjectManagementDbEntities db = new ProjectManagementDbEntities();

        // GET: api/Teams
        public List<TeamModel> GetTeams()
        {
            string userId = User.Identity.GetUserId();
            List<int> teamIds = db.TeamUserMappings.Where(x => x.UserId == userId).Select(x => x.TeamId).ToList();
            List<TeamUserMapping> teamUserMappings = db.TeamUserMappings
                .Include(x => x.AspNetUser)
                .Include(x => x.Team)
                .Where(x => teamIds.Contains(x.TeamId))
                .ToList();

            List<TeamModel> teams = teamUserMappings
                .GroupBy(x => x.TeamId, x => x.Team, (key, g) => new TeamModel
                {
                    Id = key,
                    Name = teamUserMappings.First(y => y.TeamId == key).Team.Name,
                    LastUpdated = DateHelper.ToRelativeDate(teamUserMappings.First(y => y.TeamId == key).Team.UpdatedDate.Value),
                    Members = teamUserMappings.Where(y => y.TeamId == key).Select(z => new TeamMembers
                    {
                        Name = String.Format("{0} {1}", z.AspNetUser.FirstName, z.AspNetUser.LastName),
                        Email = z.AspNetUser.Email
                    }).ToList()
                }).ToList();
                
            return teams;
        }

        // GET: api/Teams/5
        [ResponseType(typeof(Team))]
        public IHttpActionResult GetTeam(int id)
        {
            Team team = db.Teams.Find(id);
            if (team == null)
            {
                return NotFound();
            }

            return Ok(team);
        }

        // PUT: api/Teams/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTeam(int id, Team team)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != team.Id)
            {
                return BadRequest();
            }

            db.Entry(team).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Teams
        [ResponseType(typeof(Team))]
        public IHttpActionResult PostTeam(CreateTeamModel createTeamViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Team team = new Team
            {
                Name = createTeamViewModel.Name,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow,
                TeamUserMappings = new List<TeamUserMapping>
                {
                    new TeamUserMapping
                    {
                        UserId = User.Identity.GetUserId(),
                        CreatedDate = DateTime.UtcNow
                    }
                }
            };

            db.Teams.Add(team);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = team.Id }, new { id = team.Id });
        }

        // DELETE: api/Teams/5
        [ResponseType(typeof(Team))]
        public IHttpActionResult DeleteTeam(int id)
        {
            Team team = db.Teams.Find(id);
            if (team == null)
            {
                return NotFound();
            }

            db.Teams.Remove(team);
            db.SaveChanges();

            return Ok(team);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TeamExists(int id)
        {
            return db.Teams.Count(e => e.Id == id) > 0;
        }
    }
}