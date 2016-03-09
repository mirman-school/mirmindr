//Template, will be subject to revision

angular.module('mirmindr')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('mirmindrTheme')
  var mirmindrAccent = $mdThemingProvider.extendPalette('purple', {
    'A200': '9d60a9'
  });
  var mirmindrWarn = $mdThemingProvider.extendPalette('red', {
    '500': 'e72d18'
  });
  $mdThemingProvider.definePalette('mirmindrAccent', mirmindrAccent);
  $mdThemingProvider.definePalette('mirmindrWarn', mirmindrWarn)
  $mdThemingProvider.theme('default')
    .warnPalette('mirmindrWarn')
    .accentPalette('mirmindrAccent')
});
