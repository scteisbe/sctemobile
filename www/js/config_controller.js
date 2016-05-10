(function() {
angular.module('cortex')
.controller('ConfigController', ['$scope', '$localstorage', 'ConfigService', ConfigController])


function ConfigController($scope, $localstorage, ConfigService) {
  $scope.apps = $localstorage.getObject('apps') || [];
  ConfigService.then(function(x) {
    if (x.featuredResources().length) {
      $localstorage.setObject('apps', x.featuredResources());
      $scope.apps = x.featuredResources();
    } else {
      console.log("No entries in featuredResources. Using local cache.");
    }
  });

  $scope.openPage = function(url) {
    console.log("url");
  };
}
})();


