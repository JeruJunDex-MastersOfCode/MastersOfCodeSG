angular.module('starter.controllers', [])

/// AuthCtrl
/// Controller for the login screen and handles
/// login logic through authService service
.controller('AuthCtrl', ['authService', 'user', '$location', function($scope, authService, user, $location) {

    if(user.isAuthenticated){
        $location.path('/app/task_list');
    } else {
        
    }

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