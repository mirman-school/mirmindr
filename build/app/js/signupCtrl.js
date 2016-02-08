angular.module("mirmindr")
.controller("signupCtrl",function($scope,$mdToast,$mdDialog,$firebaseObject){
  $scope.user = {
    email: "",
    password: "",
    confirm: "",
  };

  $scope.showActionToast = function(msg) {
    var toast = $mdToast.simple()
          .textContent(msg)
          .action('OK')
          .highlightAction(false)
          .position("top");
    $mdToast.show(toast);
  };

  $scope.createUser = function(user) {
    ref.createUser(user,function(error, userData){
      if(error) {
        console.log(error);
      } else {
        console.log(userData);
        $scope.authenticated = true;
        $scope.$apply();
      }
    })
  };

  $scope.signup = function(form) {
    if(form.$valid) {
      if($scope.user.email === $scope.user.confirm) {
        // $scope.createUser($scope.user);
        $scope.showActionToast("Creating!");
      } else {
        $scope.showActionToast("Password and confirm don't match!");
      }
    }
  };
});
