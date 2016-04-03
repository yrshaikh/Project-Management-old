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
            controller: 'DashboardController'
        });
});