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
  }

  $scope.deleteSubject = function(sub) {
    var deleteConfirm = confirm("Are you sure you want to delete the subject? This will delete all tasks under this subject.");
    if (deleteConfirm) {
      $scope.subjects.$remove(sub);
    }
  };
});
