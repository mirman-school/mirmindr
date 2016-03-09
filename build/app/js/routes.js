angular.module("mirmindr")
.config(function($routeProvider,$locationProvider){
  $routeProvider
  .when("/",{
    templateUrl: "app/templates/tasks.html",
    controller: "tasksCtrl"
  })
  .when("/signup",{
    templateUrl: "app/templates/signup.html",
    controller: "signupCtrl"
  });
});
