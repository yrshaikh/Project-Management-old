angular.module('project-management').controller('ProjectController',
	['$scope', '$http', '$modal', 'ProjectService', '$stateParams', function ($scope, $http, $modal, projectService, $stateParams) {

	$scope.init = function(){		
		$scope.project = {
			loading: false,
			data: []
		};
		getProjectDetails($stateParams.id);
	}

	var getProjectDetails = function(projectId){
		projectService.getProjectDetails(projectId)
			.then(function(response){
				$scope.project.loading = false;
				$scope.project.data = response.data;
			});
	};

	$scope.getCurrentActiveTab = function(){
		console.log("Active", $stateParams);
		console.log("route", $route);
		return "none";
	}
}]);

angular.module('project-management').filter('twoletter', function () {
    return function(input){
    	if(input)
    	{
    		var split = input.split(' ');
    		if(split.length > 1)
    			return split[0][0].toUpperCase() + split[1][0].toUpperCase();
    		else 
    			return split[0][0].toUpperCase();
    	}
      return '';
    }
  } 
);



