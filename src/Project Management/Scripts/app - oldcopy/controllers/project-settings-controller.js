angular.module('project-management').controller('ProjectSettingsController',
	['$scope', '$http', '$modal', 'ProjectService', '$stateParams', function ($scope, $http, $modal, projectService, $stateParams) {

	$scope.init = function(){
		$scope.projectId = $stateParams.id;
		$scope.currentPage = "settings";
	}
}]);

