//Template, will be subject to revision

angular.module('mirmindr')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('mirmindrTheme')
  var mirmindrPrimary = $mdThemingProvider.extendPalette('')
  .primaryPalette(#f0f4f5)
  .accentPalette(#173345)
  .warnPalette(#f5715f)
  .backgroundPalette(#1A1A1A);
});
