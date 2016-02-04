angular.module("mirmindr")
.controller("tasksCtrl",["$scope","$firebaseObject",function($scope,$firebaseObject){
  $scope.authenticated = false;
  var ref = new Firebase("https://mirmindr.firebaseio.com");
  ref.authWithOAuthPopup("google", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      $scope.authenticated = true;
    }
  });
}]);
