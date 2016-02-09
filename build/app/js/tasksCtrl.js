angular.module("mirmindr")
.controller("tasksCtrl",function($scope,$mdToast,$mdDialog,$firebaseObject){
  var ref = new Firebase("https://mirmindr.firebaseio.com");
  var authData = ref.getAuth();
  function setUserRef(uid){
    $scope.userRef = ref.child("users").child(uid);
    $scope.authenticated = true;
    var syncObject = new $firebaseObject($scope.userRef);
    syncObject.$bindTo($scope,"data");
  };
  if (authData) {
    setUserRef(authData.uid);
  }
  $scope.user = {
    email: "",
    password: ""
  };
  $scope.newTask = {};
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
          $scope.setUserRef(authData.uid)
          $scope.$apply();
        }
      });
    }
  }

  $scope.addTask = function(form) {
    if(form.$valid) {
      $scope.newTask.dueDate = $scope.newTask.dueDate.getTime();
      $scope.userRef.child("tasks").push($scope.newTask);
      $scope.newTask = {};
    } else {
      $scope.showActionToast("Missing something?")
    }
  }
});
