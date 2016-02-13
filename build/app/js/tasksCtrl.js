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
    $scope.editingSubjects = $scope.editingSubjects ? false : true;
  };

  $scope.toggleAddingTask = function() {
    $scope.addingTask = $scope.addingTask ? false : true;
  };

  $scope.deleteTask = function(task) {
    $scope.tasks.$remove(task);
  }

  $scope.toggleDone = function(task) {
    task.done = task.done ? false : true;
    var msg = task.done ? task.name + " is done! " : task.name + " isn't done...";
    $scope.showActionToast(msg);
    $scope.tasks.$save(task);
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
