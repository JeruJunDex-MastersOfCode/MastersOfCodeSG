angular.module('starter.controllers', [])

.controller('AuthCtrl', ['$scope', 'authService', '$scope', function($scope, authService, $rootScope){

	$scope.loginDetails = {};
	$scope.doLogin = function(loginDetails){
		authService.authUser(loginDetails);
	}

}])

.controller('AuthCtrl', ['$scope', function($scope){
	
}]);