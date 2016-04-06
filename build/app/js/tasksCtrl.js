angular.module("mirmindr")
.controller("tasksCtrl",function($scope,$mdToast,$mdDialog,$firebaseArray){
  var ref = new Firebase("https://mirmindr.firebaseio.com");
  var authData = ref.getAuth();
  $scope.editingTask = null;
  function setUserRef(uid){
    $scope.userRef = ref.child("users").child(uid);
    $scope.authenticated = true;
    $scope.tasks = $firebaseArray($scope.userRef.child("tasks"));
    $scope.subjects = $firebaseArray($scope.userRef.child("subjects"));
  }
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
    // If editingSubjects is true, make it false. Or vice versa
  };

  $scope.setCurrentTask= function(task) {
    $scope.CurrentTask=task;
  };

  $scope.toggleAddingTask = function() {
    $scope.addingTask = $scope.addingTask ? false : true;
    // If addingTask is true, make it false. Or vice versa
  };

  $scope.toggleEditingTask = function(task) {
    $scope.editingTask = $scope.editingTask ? null : task;
    if($scope.editingTask) {
      $scope.newTask = angular.copy(task);;
      $scope.newTask.dueDate= new Date($scope.newTask.dueDate);
    } else {
      $scope.newTask = {};
    }
    // If editingTask is true, make it false. Or vice versa
  };
  $scope.deleteTask = function(task) {
    // Remove task from $scope.tasks
      var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this task?')
            .textContent('This cannot be undone.')
            .ok('Yes')
            .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $scope.tasks.$remove(task);
        }, function() {
        }
      );
  };

  $scope.toggleDone = function(task) {
    // Mark task as done
    task.done = task.done ? false: true;
    var msg = task.name;
    // Alert with a toast
    if (task.done) {
      msg += " is done!"
    } else {
      msg += " isn't done!"
    }
    $scope.showActionToast(msg);

    // Save the task
    $scope.tasks.$save(task);
  };

  $scope.isOverdue = function(task) {
    // Return true if the task's dueDate is older than now.
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
          setUserRef(authData.uid);
          $scope.$apply();
        }
      });
    }
  };

  $scope.logout = function() {
    ref.unauth();
    $scope.authenticated = false;
  };

  $scope.resetPassword = function() {
    ref.resetPassword({
      email: $scope.user.email
    }, function(error) {
      if (error === null) {
        $scope.showActionToast("Reset Email Sent!")
      } else {
        $scope.showActionToast("Reset Email Not Sent!")
      }
    });
  };

  $scope.addTask = function(form) {
    if(form.$valid) {
      $scope.newTask.done = $scope.newTask.done || false;
      if($scope.editingTask) {
        $scope.editingTask = $scope.newTask;
        $scope.tasks.$save($scope.editingTask);
        $scope.editingTask=null;
      }  else{
        $scope.newTask.dueDate = $scope.newTask.dueDate.getTime();
        $scope.tasks.$add($scope.newTask);
        $scope.newTask = {};
        $scope.addingTask = false;
      }
    } else {
      $scope.showActionToast("Missing something?");
    }
  };
});
