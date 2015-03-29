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
		$state.go('app.task', {id:3});
	}

}])

.controller('TaskCtrl', ['$scope', 'userService', function($scope, userService, $stateParams){

	console.log($stateParams);

	$scope.CRUD_ALLOWED = false;
	$scope.ACCEPT_ALLOWED = false;
	$scope.CAN_PROGRESS_ALLOWED = false;
	$scope.CAN_CONFIRM_ALLOWED = false;

	var userType = userService.getUser().type;
	if (userType == 1) {

	}
}]);