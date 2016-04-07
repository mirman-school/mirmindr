angular.module("mirmindr")
.controller("subjectsCtrl", function($rootScope, $scope, $mdDialog){
  $scope.newSub = {};
  $scope.editingSubject = null;
  $scope.toggleEditingSubject = function(sub){
    $scope.editingSubject = $scope.editingSubject ? null : sub;
    if($scope.editingSubject) {
      $scope.newSub = angular.copy(sub);;
    } else {
      $scope.newSub = {};
    }
  };

  $scope.setCurrentSubject = function(sub) {
    $scope.currentSubject = sub;
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
      $scope.subjects.$add($scope.newSub)
      .then(function(ref) {
        console.log(ref.path.o[3]);
        var newId = ref.path.o[3];
        if($scope.editingSubject) {
          $scope.updateTaskIds($scope.editingSubject.$id,newId);
          $scope.subjects.$remove($scope.editingSubject);
          $scope.editingSubject = null;
        }
      })
        $scope.newSub = {};
    } else {
      $scope.showActionToast("Missing Something?");
    }
  };
});
