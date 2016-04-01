angular.module('forgotPasswordApp').controller('ForgotPasswordController', 
	['$scope', '$http', function ($scope, $http) {
	
	$scope.init = function(){
		$scope.pageStates = {
			ready: 0,
			emailAddressSubmitting: 1,
			emailAddressSubmittedSuccessfully: 2,
			emailAddressNotFoundInSystem: 3,
			emailAddressSubmissionFailed: 4
		}
		$scope.currentPageState = $scope.pageStates.ready;
		$scope.EmailAddress = "";
	}
	
	$scope.submit = function(){
		if(!$scope.EmailAddress){
			$scope.fpwdForm.email.$pristine = false;
			return;
		}
		$scope.currentPageState = $scope.pageStates.emailAddressSubmitting;
		$http.post('/forgot-password', {e:$scope.EmailAddress})
			.then(successCallback)
			.catch(errorCallback);
	}
	
	var successCallback = function(response){
		if(response.data.msg == 'not-found')
			$scope.currentPageState = $scope.pageStates.emailAddressNotFoundInSystem;
		else
			$scope.currentPageState = $scope.pageStates.emailAddressSubmittedSuccessfully;
	}

	var errorCallback = function(){
		$scope.currentPageState = $scope.pageStates.emailAddressSubmissionFailed;	
	}
}]);