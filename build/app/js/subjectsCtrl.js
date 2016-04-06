angular.module("mirmindr")
.controller("subjectsCtrl", function($rootScope, $scope, $mdDialog){
  $scope.newSub = {};

  $scope.toggleEditingSubject = function(sub){
    if($scope.editingSubject===true) {
      $scope.editingSubject=false;
      $scope.newSub={};
    } else {
      $scope.newSub = angular.copy(sub);
      $scope.editingSubject=true;
      console.log($scope.sub);

    }
  };

  $scope.deleteSubject = function(sub) {
    var confirm = $mdDialog.confirm()
      .title('Are you sure you want to delete this subject?')
      .textContent('This will also delete all tasks under this subject.\nThis cannot be undone.')
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      $scope.subjects.$remove(sub);
    }, function() {});
  };

  $scope.addSub = function(form) {
    if(form.$valid) {
      // console.log($scope.newSub);
      if($scope.editingSubject) {
        $scope.subjects.$save($scope.newSub);
        $scope.editingSubject = false;
      } else {
        $scope.tasks.$add($scope.newSub);
      }
        $scope.newSub = {};
    } else {
      $scope.showActionToast("Missing Something?");
    }
  };
});
