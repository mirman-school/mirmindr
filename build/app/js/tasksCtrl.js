angular.module("mirmindr")
.controller("tasksCtrl",["$scope","$firebaseObject",function($scope,$firebaseObject){
  chrome.identity.getProfileUserInfo(function(token){
    console.log(token);
  });
  $scope.loginMessage = "Logging in...";
  $scope.authenticated = false;
  var ref = new Firebase("https://mirmindr.firebaseio.com");
  // ref.authWithCustomToken("google", function(error, authData) {
  //   if (error) {
  //     console.log("Login Failed!", error);
  //   } else {
  //     console.log("Authenticated successfully with payload:", authData);
  //     $scope.authenticated = true;
  //   }
  // });
}]);
