angular.module("mirmindr")
.controller("tasksCtrl",["$scope","$firebaseObject",function($scope,$firebaseObject){
  var ref = new Firebase("https://mirmindr.firebaseio.com");
  $scope.loginMessage = "Logging in...";
  $scope.authenticated = false;
  $scope.user = {};
  // ref.authWithOAuthPopup("google", function(error, authData) {
  //   if (error) {
  //     console.log("Login Failed!", error);
  //   } else {
  //     console.log("Authenticated successfully with payload:", authData);
  //     $scope.authenticated = true;
  //   }
  // });

  $scope.login = function(form) {
    if (form.$valid) {
      console.log($scope.user.email);
    }
  }
}]);
