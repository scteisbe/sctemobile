angular.module('scteApp.staticservices', ['times.tabletop'])
	.factory('StaticService', function ($ionicLoading, $state, $q, Tabletop,$localstorage) {

	// Might use a resource here that returns a JSON array

	var StaticService = {

		fetchStaticData: function () {
			var deferred = $q.defer();
			Tabletop.then(function (tableData) {
				//var deferred = $q.defer();
				//deferred.resolve(allSheets);
				var allSheets = tableData[0];
				deferred.resolve(allSheets);
				console.log("in fetchStaticData..");
				
				//console.log(allSheets);
				//   // console.log(JSON.stringify(data2));
				//   // console.log(JSON.stringify(data3));
				
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
				
				var staticContent = [];
				sheetnames.forEach(function(sheet, i){
					try {
						// try to update from feed
						staticContent[sheet] = allSheets[sheet].elements;
						if (!staticContent[sheet].length) {
							throw "No entries found. Are there empty rows in the sheet?";
						}
						// store result in localstorage for fast access next time
						$localstorage.setObject('staticcontent.' + sheet, staticContent[sheet]);
						
						//console.log(sheet + "..." + JSON.stringify(staticContent[sheet]));
					} catch (error) {
						console.log("Can't read sheet '" + sheet + "'. Using local client cache. " + error);
					}     
				});
				
		
			});
			return deferred.promise;
		}
	}
	return StaticService;
	})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
