angular.module("mirmindr")
.controller('ToastCtrl', function($scope, $mdToast) {
  $scope.closeToast = function() {
    $mdToast.hide();
  };
});
