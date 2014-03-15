angular.module('app').controller('mvSignupController', function($scope, mvUser, mvNotifier, $location, mvAuthenticator) {

    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.firstname,
            lastName: $scope.lastname
        };

        mvAuthenticator.createUser(newUserData).then(function() {
            mvNotifier.notifySuccess('User account created!');
            $location.path('/');
        }, function(reason) {
            mvNotifier.notifyFailure(reason);
        });
    }
});