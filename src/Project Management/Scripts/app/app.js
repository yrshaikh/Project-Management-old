var routerApp = angular.module('project-management', ['ui.bootstrap', 'ui.router']);
routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/template/dashboard',
            controller: 'DashboardController'
        })
        .state('tasks', {
            url: '/tasks',
            templateUrl: '/template/tasks',
            controller: 'TasksController'
        })
        .state('people', {
            url: '/people',
            templateUrl: '/template/people',
            controller: 'PeopleController'
        })
        .state('notes', {
            url: '/notes',
            templateUrl: '/template/tasks',
            controller: 'TasksController'
        });
});