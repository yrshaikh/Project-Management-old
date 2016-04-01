angular.module('project-management').controller('DashboardController', 
	['$scope', '$http', '$modal', '$rootScope', function ($scope, $http, $modal, $rootScope) {
	
	$scope.init = function(){
        $scope.currentPage = 'dashboard';
	}

	$scope.create = function () {
		var modalInstance = $modal.open({
			templateUrl: '/template/createteam',
			//controller: 'NewProjectController',
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

