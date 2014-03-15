angular.module('app').controller('mvNavBarLoginController', function($scope, $http, mvNotifier, mvIdentity, mvAuthenticator, $location) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuthenticator.authenticateUser(username, password).then(function(success) {
            if (success) {
                mvNotifier.notifySuccess('You have successfully logged in!');
            } else {
                mvNotifier.notifyFailure('The username/password combination is incorrect.');
            }
        });
    }

    $scope.signout = function() {
        mvAuthenticator.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notifySuccess('You have successfully signed out.');
            $location.path('/');
        })
    }
});