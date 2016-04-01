angular.module('project-management').controller('NewProjectController',
    ['$scope', '$modalInstance', '$location', 'ProjectService', function ($scope, $modalInstance, $location, projectService) {
        $scope.ok = function () {
            $modalInstance.close($scope.selected);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.init = function () {
            $scope.project = {
                name: '',
                saving: false,
                saveSuccess: false,
                saveFailure: false,
                saveFailureDuplicate: false
            };
        }
        $scope.saveProject = function () {
            $scope.project.saving = true;
            $scope.project.saveFailure = false;
            $scope.project.saveFailureDuplicate = false;
            projectService.createNewProject($scope.project.name)
                .success(function (response) {
                    console.log(response);
                    $scope.project.saving = false;
                    if (response.errmsg && response.errmsg.indexOf('duplicate') != -1)
                        $scope.project.saveFailureDuplicate = true;
                    else {
                        $scope.cancel();
                        $location.path('/project/' + response.id + '/issues');
                    }

                })
                .error(function () {
                    $scope.project.saving = false;
                    $scope.project.saveFailure = true;
                });
        }
    }]);