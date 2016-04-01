angular.module('project-management').controller('ProjectDocumentsController',
	['$scope', '$http', '$modal', 'ProjectService', '$stateParams', function ($scope, $http, $modal, projectService, $stateParams) {

	$scope.init = function(){
		$scope.projectId = $stateParams.id;
		$scope.currentPage = "documents";
	}
}]);

