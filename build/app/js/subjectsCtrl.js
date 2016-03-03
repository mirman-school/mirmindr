angular.module("mirmindr")
.controller("subjectsCtrl", function($rootScope, $scope){
  $scope.newSub = {};
  $scope.addSub = function(form) {
    if(form.$valid) {
      $scope.userRef.child("subjects").push($scope.newSub);
      $scope.newSub = {};
    } else {
      $scope.showActionToast("Missing Something?");
    }
  };

  $scope.deleteSubject = function(sub) {
<<<<<<< HEAD
    console.log("Running delete function");
    var deleteConfirm = confirm("Are you sure you want to delete the subject?");
    if (deleteConfirm) {
      $scope.subjects.$remove(sub);
    }
  }
=======
    $scope.subjects.$remove(sub);
  };
>>>>>>> 94b23ef5d3ec30e40cb6a30f0e43b91cc0b2915e

});
