using System.Web.Mvc;

namespace Project_Management.Controllers
{
    public class TemplateController : Controller
    {
        #region Team
        public ActionResult Dashboard()
        {
            return View();
        }

        public ActionResult CreateTeam()
        {
            return View();
        }
        #endregion
    }
}