angular.module('starter.services', [])

.factory('authService', ['user', function($http, user){

	var service = {};

	service.authenticate = function(credentials) {
		$http.get('data/user.json?id=' + new Date().getTime())
		.then(function(response) {
			user.init(response.data);
		});
	}

	return service;
}])

.factory('tasks', function($http){

	var service = {};

	service.getAll = function(userid){
		$http.get('data/tasks.json?id=' + new Date().getTime())
		.then(function(response) {
			// user.init(response.data);
		});
	}

	// get all - include user id to get only relevant to current user
	// ^on receipt, publish event so listening controllers can pickup

	// *possible addition (but not now), socket communication for
	// real time update of newly added (i.e., relevant) tasks
	// ^or manual pull down to refresh gesture?

	// get - task details given an id

	// requestConfirmation - VA done, pending approval from mom
	// confirmCompletion - mom finally confirms to close task

	return service;
});

.factory('user', function($http){

	var service = {},
		_isAuthenticated = false,
		_user = {
			name: "John Doe",
			abilities: {
				CAN_ADD: false,
				CAN_EDIT: false,
				CAN_DELETE: false
			}
		};

	function init(user) {
		_isAuthenticated = false;
	}

	// init (invoked by authService) set user display details
	// setup allowed actions depending on user type
	// then redirect to task list screen

	service.isAuthenticated = function(){
		return _isAuthenticated;
	}

	return service;
})


