angular.module("mirmindr")
.controller("tasksCtrl",function($scope,$mdToast,$mdDialog,$firebaseObject){
  var ref = new Firebase("https://mirmindr.firebaseio.com");
  $scope.authenticated = false;
  $scope.user = {
    email: "",
    password: ""
  };
  chrome.identity.getProfileUserInfo(function(data){
    if(data.email) {
      console.log("Email found");
      $scope.user.email = data.email;
      $scope.$apply();
    }
  });

  $scope.showActionToast = function(msg) {
    var toast = $mdToast.simple()
          .textContent(msg)
          .action('OK')
          .highlightAction(false)
          .position("top");
    $mdToast.show(toast);
  };

  $scope.login = function(form) {
    if (form.$valid) {
      ref.authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }, function(error, authData) {
        if(error) {
          $scope.showActionToast(error.toString());
        } else {
          console.log(authData);
          $scope.authenticated = true;
          var syncObject = new $firebaseObject(ref);
          syncObject.$bindTo($scope,"data");
          $scope.$apply();
        }
      });
    }
  }
});
