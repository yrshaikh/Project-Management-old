/**
 * Created by yasser.s on 11/15/2015.
 */

angular.module("project-management").factory('TeamService', ['$http', function ($http) {
    return {
        createNewTeam: function (name) {
            var team = {name: name};
            return $http({
                url: '/api/teams',
                method: 'POST',
                data: team
            });
        }
    };
}]);