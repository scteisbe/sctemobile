 'user strict';

(function() {
	angular.module('cortex')
	.factory('ConfigService', ['$q', 'Tabletop', ConfigService])


	function ConfigService($q, Tabletop) {
		var svc = init(),
			allSheets = null;

		return svc;

		/**
		  * Initialise tabletop and return a promise that resolves once the 
		  * spreadsheet has loaded
		  */
		function init() {
			// An object that holds all the methods the caller can access
			var service = {
				allSheets: allSheets
			}
			
			var deferred = $q.defer();			

			// Load the spreadsheet
			Tabletop.then(function(TabletopSheets) {
				// or access a sheet directly e.g. TabletopSheets[0].featuredResources.elements
				allSheets = TabletopSheets[0];
				deferred.resolve(service);
			});

			return deferred.promise;
		}
		
		function allSheets() {
			return allSheets;
		}
	}
})();