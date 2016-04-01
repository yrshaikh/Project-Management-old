angular.module('project-management').controller('NewIssueController',
 ['$scope', '$modalInstance', 'ProjectService', function ($scope, $modalInstance, projectService) {
    $scope.ok = function () {
        $modalInstance.close($scope.selected);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.init = function(){
      initSelect2s();
      $scope.project = {
        name: '',
        saving: false,
        saveSuccess: false,
        saveFailure: false,
        saveFailureDuplicate: false
      };
    };

    var initSelect2s = function(){
        $("#priority").select2();
    }

    $scope.saveProject = function(){
      $scope.project.saving = true;
      $scope.project.saveFailure = false;
      $scope.project.saveFailureDuplicate = false;
      projectService.createNewProject($scope.project.name)
          .success(function(response){
              $scope.project.saving = false;
              if(response.errmsg && response.errmsg.indexOf('duplicate') != -1)
                $scope.project.saveFailureDuplicate = true;
              alert("popup close");
          })
          .error(function(){
              $scope.project.saving = false;
              $scope.project.saveFailure = true;
          });
    }
}]);