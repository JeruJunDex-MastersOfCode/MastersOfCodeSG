angular.module('starter.services', [])

.factory('authService', ['$http', '$rootScope', 'userService', function($http, $rootScope, userService){

	var factory = {};

	factory.authUser = function(loginDetails) {

		$http.get('data/user.json?id=' + new Date().getTime()).then(function(response) {
			userService.setUser(response.data);
		});
	}

	return factory;
}])

.factory('userService', ['$http' ,'$state', function($http, $state){

	var factory = {};
	var _user = {};

	factory.setUser = function(user){
		_user = user;
		$state.go('app.tasks');
	};

	return factory;
}]);