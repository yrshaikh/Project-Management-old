angular.module('project-management').controller('CreateNewTeamController',
    ['$scope', '$modalInstance', '$location', 'TeamService', function ($scope, $modalInstance, $location, teamService) {
        $scope.ok = function () {
            $modalInstance.close($scope.selected);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.init = function () {
            $scope.team = {
                name: '',
                saving: false,
                saveSuccess: false,
                saveFailure: false
            };
        }
        $scope.createNewTeam = function () {
            $scope.team.saving = true;
            $scope.team.saveFailure = false;
            $scope.team.saveFailureDuplicate = false;
            teamService.createNewTeam($scope.team.name)
                .success(function (response) {
                    $scope.team.saving = false;
                        $scope.cancel();
                        $location.path('/team/#' + response.teamid + '/tasks');
                })
                .error(function () {
                    $scope.team.saving = false;
                    $scope.team.saveFailure = true;
                });
        }
    }]);