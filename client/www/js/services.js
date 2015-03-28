angular.module('starter.services', [])

.factory('authService', function($http){

	var service = {};

	// func authenticate(id, password)
	// func onAuthSuccess(user)
	// func logout?

	// other handlers for auth errors
	// ^ skip for now though
	
	// init(); if needed
	return service;
})

.factory('userService', function($http){

	// init (invoked by authService) set user display details
	// setup allowed actions depending on user type
	// then redirect to task list screen
})

.factory('tasksService', function($http){

	// get all - include user id to get only relevant to current user
	// ^on receipt, publish event so listening controllers can pickup

	// *possible addition (but not now), socket communication for
	// real time update of newly added (i.e., relevant) tasks
	// ^or manual pull down to refresh gesture?

	// get - task details given an id

	// requestConfirmation - VA done, pending approval from mom
	// confirmCompletion - mom finally confirms to close task
});
