angular.module('starter.controllers', [])

.controller('TasksCtrl', function($scope){
    $scope.tasks = [
    { title: "Task Title", description: "Lorem ipsum dolor sit amet adispisicing elit. Consectitur emat." },
    { title: "Task Title", description: "Lorem ipsum dolor sit amet adispisicing elit. Consectitur emat." },
    { title: "Task Title", description: "Lorem ipsum dolor sit amet adispisicing elit. Consectitur emat." }
    ];
})