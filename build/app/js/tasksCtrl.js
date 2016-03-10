angular.module("mirmindr")
.controller("tasksCtrl",function($scope,$mdToast,$mdDialog,$firebaseArray){
  var ref = new Firebase("https://mirmindr.firebaseio.com");
  var authData = ref.getAuth();
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

  $scope.toggleAddingTask = function() {
    $scope.addingTask = $scope.addingTask ? false : true;
    // If addingTask is true, make it false. Or vice versa
  };
  $scope.toggleEditingTask = function(task) {
    if($scope.editingTask===true)
    {
    $scope.editingTask=false;
    $scope.newTask={};
    } else {
      $scope.newTask=task;
      $scope.newTask.dueDate= new Date($scope.newTask.dueDate);
      $scope.editingTask=true;

    }

    // If editingTask is true, make it false. Or vice versa
  };
  $scope.deleteTask = function(task) {
      var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this task?')
            .textContent('This cannot be undone.')
            .ok('Yes')
            .cancel('No');
      $mdDialog.show(confirm).then(function() {
        $scope.tasks.$remove(task);
      }, function() {
      });
    };
  });
    // Remove task from $scope.tasks



  $scope.toggleDone = function(task) {
    // Mark task as done
    task.done = task.done ? false: true;

    // Alert with a toast
    $scope.showActionToast("'" + task.name + "' has been marked as done");

    // Save the tasks array
    $scope.tasks.$save(task);
  };

  $scope.isOverdue = function(task) {
    //Return true if current date is past dueDate
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


  $scope.addTask = function(form) {
    if(form.$valid) {


          $scope.newTask.dueDate = $scope.newTask.dueDate.getTime();
          $scope.newTask.done=$scope.newTask.done || false;
      if($scope.editingTask)
      {

        $scope.tasks.$save($scope.newTask);
        $scope.editingTask=false;
      }
      else{
        //  console.log($scope.newTask);

          $scope.newTask.done = false;
          $scope.tasks.$add($scope.newTask);
          $scope.newTask = {};
            $scope.addingTask = false;
      }
    } else {
      $scope.showActionToast("Missing something?");
    }
  };
