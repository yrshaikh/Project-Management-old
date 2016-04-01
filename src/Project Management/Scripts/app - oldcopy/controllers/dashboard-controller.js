angular.module('project-management').controller('DashboardController', 
	['$scope', '$http', '$modal', 'ProjectService', '$rootScope', function ($scope, $http, $modal, projectService, $rootScope) {
	
	$scope.init = function(){
        $scope.subNavEnabled = false;
		$scope.projects = {
			data: [],
			loading: false
		};
		loadProjects();

		$scope.currentPage = 'dashboard';
	}

	var loadProjects = function(){
        $scope.projects.loading = true;
		projectService.getAllProjects()
			.then(function(response){
                $scope.projects.loading = false;
				$scope.projects.data = response.data;
			});
	};

	$scope.newProject = function(){
		var modalInstance = $modal.open({
			templateUrl: '/templates/popups/new-project.html',
			controller: 'NewProjectController',
			//size: 'lg',
			animation: false,
			resolve: {
				items: function () {
				  return $scope.items;
				}
			}
		});

		/*modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			//console.log('Modal dismissed at: ' + new Date());
		});*/
	}	
}]);

