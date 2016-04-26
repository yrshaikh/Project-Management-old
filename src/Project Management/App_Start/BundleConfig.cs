using System.Web;
using System.Web.Optimization;

namespace Project_Management
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                        "~/Scripts/angular.min.1.4.6.js",
                        "~/Scripts/angular-ui.js",
                        "~/Scripts/angular-ui-router.js",
                        "~/Scripts/ui-bootstrap-tpls-0.11.0.js",

                        "~/Scripts/plugins/select2.js",
                        
                        "~/Scripts/app/app.js",

                        "~/Scripts/app/filters/two-letter-filter.js",

                        "~/Scripts/app/services/team-service.js",

                        "~/Scripts/app/controllers/navigation-controller.js",
                        "~/Scripts/app/controllers/dashboard-controller.js",
                        "~/Scripts/app/controllers/new-team-controller.js",
                        "~/Scripts/app/controllers/tasks-controller.js",
                        "~/Scripts/app/controllers/people-controller.js",
                        "~/Scripts/app/controllers/notes-controller.js"

                        ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/authenticated").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/select2/select2.css",
                      "~/Content/jqueryui/jquery-ui.css",
                      "~/Content/Font.css",
                      "~/Content/Header.css",
                      "~/Content/Main.css",
                      "~/Content/Team.css",
                      "~/Content/Buttons.css",
                      "~/Content/Textbox.css",
                      "~/Content/Popup.css",
                      "~/Content/Card.css",
                      "~/Content/People.css",
                      "~/Content/Task.css"
                      ));

            bundles.Add(new StyleBundle("~/Content/unauthenticated").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Font.css",
                      "~/Content/Header.css",
                      "~/Content/Layout.css",
                      "~/Content/Login.css"
                      ));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            //BundleTable.EnableOptimizations = true;
        }
    }
}
