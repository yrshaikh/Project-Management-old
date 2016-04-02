angular.module('project-management').controller('DashboardController', 
	['$scope', '$http', '$modal', '$rootScope', 'TeamService', function ($scope, $http, $modal, $rootScope, teamService) {
	
	$scope.init = function(){
	    $scope.currentPage = 'dashboard';
	    loadTeams();
	}

	var loadTeams = function () {
	    $scope.teams = {
            loading: true,
            error: false,
            data: []
	    };

	    teamService.getTeams()
	        .then(function (response) {
	            $scope.teams.loading = false;
                if (response.status === 200) {
                    $scope.teams.data = response.data;
                } else {
                    $scope.teams.error = true;
                }
	        });
	}

	$scope.create = function () {
		var modalInstance = $modal.open({
			templateUrl: '/template/createteam',
		    controller: 'CreateNewTeamController',
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

