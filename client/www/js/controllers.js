angular.module('starter.controllers', [])

.controller('AuthCtrl', ['$scope', 'authService', '$scope', function($scope, authService, $rootScope){

	$scope.loginDetails = {};
	$scope.doLogin = function(loginDetails){
		authService.authUser(loginDetails);
	}

}])

.controller('TasksCtrl', ['$scope', 'taskService', '$rootScope', '$state', function($scope, taskService, $rootScope, $state){

	$scope.tasks = [];

	taskService.getTasks("7865");
	$rootScope.$on('tasks_received', function(){
		$scope.tasks = taskService.tasks();
	});

	$scope.viewTask = function(task){
		$state.go('app.task');
	}

}]);