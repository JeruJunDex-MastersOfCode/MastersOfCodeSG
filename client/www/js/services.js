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
}])

.factory('taskService', ['$http', '$rootScope', function($http, $rootScope){

	var factory = {};

	var _tasks = [];

	factory.getTasks = function(id){
		$http.get('data/tasks.json?id=' + new Date().getTime()).then(function(response) {
			_tasks = response.data.tasks;
			$rootScope.$broadcast('tasks_received', null);
		});
	}

	factory.tasks = function(){ return _tasks; }



	return factory;

}]);