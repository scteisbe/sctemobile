(function() {
angular.module('cortex')
.controller('DynamicContentController', ['$scope', '$http', '$localstorage', '_', DynamicContentController])
  function DynamicContentController($scope, $http, $localstorage) {
    $scope.openPage = function(url) {
      window.open(url, '_system');
    };

    $scope.dynamiccontent = [];
    var dcobjects = [
      { "name": "meetings", "url": "/stubs/meetings.json" }
    ];

    // immediately populate from localstorage
//     dcobjects.forEach(function(item, i){
    _.forEach(dcobjects, function(item, i) {
      console.log("Loading dynamic content from local cache: " + item.name);
      $scope.dynamiccontent[item.name] = $localstorage.getObject('dynamiccontent.' + item.name) || [];

      console.log("Loading dynamic content from server");
      $http({
        method: 'GET',
        url: item.url
        // url: '/stubs/meetings.json'
      })
      .then(
        function successCallback(response) {
          try {
              // try to update from feed
              $scope.dynamiccontent[item.name] = response.data;
              if (!$scope.dynamiccontent[item.name].length) {
                throw "No entries assigned to " + item.name + " from " + item.url;
              }
              // store result in localstorage for fast access next time
              $localstorage.setObject('dynamiccontent.' + item.name, $scope.dynamiccontent[item.name]);
              console.log("Loaded dynamic content to " + item.name + " from " + response.config.url);
          } catch (error) {
            console.log("Can't read JSON feed '" + item.url + "'. Using local client cache. " + error);
          }			
        },
        function errorCallback(response) {
        }
      );

var temp = moment().format("MMM Do YY");
console.log(temp);

    });


  }
})();