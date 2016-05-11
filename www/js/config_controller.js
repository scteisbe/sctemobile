(function() {
angular.module('cortex')
.controller('ConfigController', ['$scope', '$localstorage', 'ConfigService', ConfigController])


function ConfigController($scope, $localstorage, ConfigService) {
  $scope.platform = ionic.Platform.platform();
  switch($scope.platform) {
    case 'ios':
      $scope.prettyPlatform = "iOS";
      break;
    case 'android':
      $scope.prettyPlatform = "Android";
      break;
    default:
      $scope.prettyPlatform = $scope.platform;
  }
  console.log($scope.prettyPlatform + " aka " + $scope.platform);
  $scope.staticcontent = [];

  // data is stored at https://docs.google.com/spreadsheets/d/1KTe0AcWPrApY8qOzTV_lJrftDxo0ZDRB7DYtzZfvFLY/edit#gid=2075321114
  var sheetnames = [  // every sheet you want access to needs to be listed here
//     'a-sheet-with-errors',   // used for testing
//     'a-sheet-that-does-not-exist',   // used for testing
//     'an-empty-sheet',    // used for testing
    'featuredresources',
    'apps',
    'featuredcourses',
    'techtips',
    'standards',
    'whitepapers',
    'operationalpractices'
  ];

  // immediately populate from localstorage
  sheetnames.forEach(function(sheet, i){
    $scope.staticcontent[sheet] = $localstorage.getObject('staticcontent.' + sheet) || sheet;
  });

  ConfigService.then(function(x) {
    sheetnames.forEach(function(sheet, i){
      try {
          // try to update from feed
          $scope.staticcontent[sheet] = x.allSheets()[sheet].elements;
          if (!$scope.staticcontent[sheet].length) {
            throw "No entries found. Are there empty rows in the sheet?";
          }
          // store result in localstorage for fast access next time
          $localstorage.setObject('staticcontent.' + sheet, $scope.staticcontent[sheet]);
          console.log("Read: " + sheet);
      } catch (error) {
        console.log("Can't read sheet '" + sheet + "'. Using local client cache. " + error);
      }			
    });
  });

  $scope.openPage = function(url) {
    window.open(url, '_system');
  };
}
})();
