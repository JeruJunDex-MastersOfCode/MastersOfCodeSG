angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

//// controllers


/// AuthCtrl
/// Controller for the login screen and handles
/// login logic through authService service
.controller('AuthCtrl', ['authService', function($scope, authService) {

    // calls authService.authenticate passing on 
    // bound values for username and password

    // on successful login, update app state (done loading)
}])

/// TaskListCtrl
/// Controller for the Task List screen
.controller('TaskListCtrl', ['tasksService', function($scope, tasksService){

    // on init, get all tasks through the service
    // but only those relevant to current user
    // ^ filtering handled by backend

    // on tasks retrieved, update app state (done loading)
    // set scope.tasks to retrieved tasks

    // additional functions for sorting and filtering of
    // displayed tasks
}])

/// TaskDetailCtrl
/// Controller for the Task Detail screen
.controller('TaskDetailCtrl', ['tasksService', function($scope, tasksService){

    // display details of selected task
    // download comments trail of task

    // *create directive to enable/disable allowed actions
    // call tasksService for every action
}])