angular.module('scteApp.staticservices', ['times.tabletop', 'ngStorage'])
    .factory('StaticService', function ($ionicLoading, $state, $q, Tabletop, $localStorage) {

        // Might use a resource here that returns a JSON array

        var StaticService = {

            fetchStaticData: function () {
                var deferred = $q.defer();
                
                Tabletop.then(function (tableData) {

                    //$ionicLoading.hide();
                    var allSheets = tableData[0];
                    deferred.resolve(allSheets);
                    console.log("in fetchStaticData..");

                    var sheetnames = [ 
					'announcements',
					'featuredresources',
					'apps',
					'featuredcourses',
					'techtips',
					'standards',
					'whitepapers',
					'operationalpractices'
				];

                    var staticContent = [];
                    sheetnames.forEach(function (sheet, i) {
                        try {
                            // try to update from feed
                            staticContent[sheet] = allSheets[sheet].elements;
                            if (!staticContent[sheet].length) {
                                throw "No entries found. Are there empty rows in the sheet?";
                            }
                            // store result in localstorage for fast access next time
                            $localStorage['staticcontent.' + sheet] = staticContent[sheet];

                            //console.log(sheet + "..." + JSON.stringify(staticContent[sheet]));
                        } catch (error) {
                            console.log("Can't read sheet '" + sheet + "'. Using local client cache. " + error);
                        }
                    });


                }, function (error) {
					//$ionicLoading.hide();
                    console.error("Error reading from spreadsheet: ..." + error);
					alert("Error reading from spreadsheet: ..." + error);
                    //return $q.reject(error);

                });
                return deferred.promise;
            }
        }
        return StaticService;
    })