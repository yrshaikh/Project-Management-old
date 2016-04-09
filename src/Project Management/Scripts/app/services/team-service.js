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
        },
        getTeams: function () {
            return $http({
                url: '/api/teams',
                method: 'GET'
            });
        },
        getTeamsMembers: function (id) {
            return $http({
                url: '/api/teampeople/' + id,
                method: 'GET'
            });
        },
        addMember: function (obj) {
            return $http({
                url: '/Team/AddMember/',
                data: obj,
                method: 'POST'
            });
        },
        deleteMember: function (obj) {
            return $http({
                url: '/Team/DeleteMember/',
                data: obj,
                method: 'POST'
            });
        }
    };
}]);