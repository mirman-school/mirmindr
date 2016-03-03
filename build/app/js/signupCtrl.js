angular.module("mirmindr")
.controller("signupCtrl",function($route,$location,$scope,$mdToast,$mdDialog,$firebaseObject){
  var ref = new Firebase("https://mirmindr.firebaseio.com");

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
        $scope.showActionToast(error.toString());
      } else {
        console.log(userData);
        $scope.showActionToast("Signed up!")
        .then(function(){
          $location.path("/");
        });
      }
    });
  };

  $scope.signup = function(form) {
    if(form.$valid) {
      if($scope.user.password === $scope.user.confirm) {
        $scope.createUser($scope.user);
        // $scope.showActionToast("Creating!");
      } else {
        $scope.showActionToast("Password and confirm don't match!");
      }
    }
  };
});
