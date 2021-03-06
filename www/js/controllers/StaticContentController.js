(function() {
angular.module('cortexConfig')
.controller('StaticContentController','AppConstants', ['$scope', '$localStorage', 'ConfigService', StaticContentController,AppConstants])


function StaticContentController($scope, $localStorage, ConfigService) {
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

  $scope.openPage = function(url) {
    window.open(url, '_system');
  };

  $scope.staticcontent = [];

  // data should be edited at https://docs.google.com/spreadsheets/d/1KTe0AcWPrApY8qOzTV_lJrftDxo0ZDRB7DYtzZfvFLY/edit#gid=2075321114
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
    'operationalpractices',
    'configs',
    'cobranding',
    'games',
    'primers'
  ];

  // immediately populate from localstorage
  sheetnames.forEach(function(sheet, i){
    $scope.staticcontent[sheet] = $localStorage['staticcontent.' + sheet] || sheet;
  });
  ConfigService.then(function(x) {
    sheetnames.forEach(function(sheet, i){
      try {
          // try to update from feed
          $scope.staticcontent[sheet] = x.allSheets()[sheet].elements;
          if (!$scope.staticcontent[sheet].length) {
            throw AppConstants.staticNoentriesFound;
          }
          // store result in localstorage for fast access next time
          $localStorage['staticcontent.' + sheet] = $scope.staticcontent[sheet];
      } catch (error) {
        console.log("Can't read sheet '" + sheet + "'. Using local client cache. " + error);
      }     
    });
  });





}
})();