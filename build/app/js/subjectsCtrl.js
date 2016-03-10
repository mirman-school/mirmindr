angular.module("mirmindr")
.controller("subjectsCtrl", function($rootScope, $scope, $mdDialog){
  $scope.newSub = {};
  $scope.addSub = function(form) {
    if(form.$valid) {
      $scope.userRef.child("subjects").push($scope.newSub);
      $scope.newSub = {};
    } else {
      $scope.showActionToast("Missing Something?");
    }
  }

//   $scope.deleteSubject = function(sub) {
//     var deleteConfirm = confirm("Are you sure you want to delete the subject? This will delete all tasks under this subject.");
//     if (deleteConfirm) {
//       $scope.subjects.$remove(sub);
//     }
//   };
// });

$scope.deleteSubject = function(sub) {
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this subject?')
          .textContent('This will also delete all tasks under this subject.\nThis cannot be undone.')
          .ok('Yes')
          .cancel('No');
    $mdDialog.show(confirm).then(function() {
      $scope.subjects.$remove(sub);
    }, function() {
    });
  };
});
