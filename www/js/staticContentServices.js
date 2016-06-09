 'user strict';

(function() {
	angular.module('scteApp.staticservices',[])
	.factory('ConfigService', ['$q', 'Tabletop', ConfigService])


	function ConfigService($q, Tabletop) {
		
		console.log("Tabletop..." + Tabletop);
		var svc = init(),
			allSheets = null;

		return svc;
		
		function init() {
			
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