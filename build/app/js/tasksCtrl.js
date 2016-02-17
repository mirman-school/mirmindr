angular.module("mirmindr")
.controller("tasksCtrl",function($scope,$mdToast,$mdDialog,$firebaseArray){
  var ref = new Firebase("https://mirmindr.firebaseio.com");
  var authData = ref.getAuth();
  function setUserRef(uid){
    $scope.userRef = ref.child("users").child(uid);
    $scope.authenticated = true;
    $scope.tasks = $firebaseArray($scope.userRef.child("tasks"));
    $scope.subjects = $firebaseArray($scope.userRef.child("subjects"));
  };
  if (authData) {
    console.log("Authenticated");
    setUserRef(authData.uid);
  }
  $scope.user = {
    email: "",
    password: ""
  };

  $scope.toggleSubjects = function() {
    // If editingSubjects is true, make it false. Or vice versa
  };

  $scope.toggleAddingTask = function() {
    // If addingTask is true, make it false. Or vice versa
  };

  $scope.deleteTask = function(task) {
    // Remove task from $scope.tasks
  };

  $scope.toggleDone = function(task) {
    // Mark task as done
    // Alert with a toast
    // Save the tasks array
  };

  $scope.isOverdue = function(task) {
    // Return true if the task's dueDate is older than now.
  }

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
          setUserRef(authData.uid);
          $scope.$apply();
        }
      });
    }
  }

  $scope.addTask = function(form) {
    if(form.$valid) {
      console.log($scope.newTask);
      $scope.newTask.dueDate = $scope.newTask.dueDate.getTime();
      $scope.newTask.done = false;
      $scope.tasks.$add($scope.newTask);
      setTasksBySubject();
      $scope.newTask = {};
    } else {
      $scope.showActionToast("Missing something?")
    }
  }
});
