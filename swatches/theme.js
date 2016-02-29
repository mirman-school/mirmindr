//Template, will be subject to revision

angular.module('mirmindr')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('mirmindrTheme')
  var mirmindrAccent = $mdThemingProvider.extendPalette('Blue Grey', {
    '500': '173345'
  });
  var mirmindrWarn = $mdThemingProvider.extendPalette('Orange', {
    '500': 'f5715f'
  });
$mdThemingProvider.definePalette('mirmindrAccent', mirmindrAccent);
$mdThemingProvider.definePalette('mirmindrWarn', m)
});
