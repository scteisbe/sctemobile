 'user strict';

(function() {
	angular.module('starter')
	.factory('ConfigService', ['$q', 'Tabletop', ConfigService])


	function ConfigService($q, Tabletop) {
		var svc = init(),
			featuredResources = null,
			allSheets = null;

		return svc;

		/**
		  * Initialise tabletop and return a promise that resolves once the 
		  * spreadsheet has loaded
		  */
		function init() {
			// An object that holds all the methods the caller can access
			var service = {
				allSheets: allSheets,
				featuredResources: featuredResources
			}
			
			var deferred = $q.defer();			

			// Load the spreadsheet
			Tabletop.then(function(TabletopSheets) {
				// Once the spreadsheet is loaded
				allSheets = TabletopSheets[0];
				try {
					featuredResources = TabletopSheets[0].featuredResources.elements;
				} catch (error) {
				  console.log("featuredResources sheet not found");
				  featuredResources = {};
				}			
				deferred.resolve(service);
			});

			return deferred.promise;
		}
		
		function allSheets() {
			return allSheets;
		}
		function featuredResources() {
			return featuredResources;
		}
	}
})();