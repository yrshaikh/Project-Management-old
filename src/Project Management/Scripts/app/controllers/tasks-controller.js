angular.module('project-management').controller('PeopleController',
    ['$scope', 'TeamService', function ($scope, teamService) {
        $scope.init = function () {
            alert("yo wassup");
        }
    }]);