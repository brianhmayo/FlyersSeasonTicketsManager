angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {auth: function(mvAuthenticator) {
            return mvAuthenticator.authorizeCurrentUserForRoute('admin');
        }},
        user: {auth: function(mvAuthenticator) {
            return mvAuthenticator.authorizeAuthenticatedUserForRoute();
        }}
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainController'})
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list', controller: 'mvUserListController', resolve: routeRoleChecks.admin
        })
        .when('/signup', { templateUrl: '/partials/account/signup', controller: 'mvSignupController'})
        .when('/profile', { templateUrl: '/partials/account/profile', controller: 'mvProfileController', resolve: routeRoleChecks.user});
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});