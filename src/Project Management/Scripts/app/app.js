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
            url: '/:id/tasks',
            templateUrl: '/template/tasks',
            controller: 'TasksController'
        })
        .state('people', {
            url: '/:id/people',
            templateUrl: '/template/people',
            controller: 'PeopleController'
        })
        .state('notes', {
            url: '/:id/notes',
            templateUrl: '/template/tasks',
            controller: 'TasksController'
        });
});