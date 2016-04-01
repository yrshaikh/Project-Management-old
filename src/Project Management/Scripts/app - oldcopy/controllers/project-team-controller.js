angular.module('project-management').controller('ProjectTeamController',
	['$scope', '$http', '$modal', 'ProjectService', '$stateParams', function ($scope, $http, $modal, projectService, $stateParams) {

	$scope.init = function(){
		$scope.projectId = $stateParams.id;
		$scope.currentPage = "team";
	}
}]);

