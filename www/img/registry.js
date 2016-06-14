var cortexConfig = angular.module('cortexConfig', ['ionic','ionic-ratings', 'ionic-datepicker',
                                                    'ngHolder','scteApp.services',
                                                    'scteApp.staticservices',
                                                     'ngStorage',
                                                     'times.tabletop',
													 									 
                                                    ]);
var theDataService = null;

cortexConfig.config(appRoute)



cortexConfig.run(['$ionicPlatform','$localstorage', function($ionicPlatform,$localstorage) {
	theDataService = $localstorage;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.statusbar();
    }

  });
}]);

cortexConfig.config(function($ionicConfigProvider) {
    // force Android tabs to bottom
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-left');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.backButton.text('Back');
    $ionicConfigProvider.backButton.previousTitleText(false);
});

// To read the data from google spreadshee.
cortexConfig.config(function(TabletopProvider){
    TabletopProvider.setTabletopOptions({
      //key: '1_-dt2DoMrDJZ0MR57Ysh6m6HyEn2UE80ckH-7ALx2nI',
      key: '1KTe0AcWPrApY8qOzTV_lJrftDxo0ZDRB7DYtzZfvFLY',
      simpleSheet: false,
	  callback: showInfo,
    });
	//alert("init tabeltop");
  });
  
 //temp for debugging
function showInfo(data) {
		if (data===null)
			alert("null data");
		else
		{
			var sheetnames = [  // every sheet you want access to needs to be listed here
				//     'a-sheet-with-errors',   // used for testing
				//     'a-sheet-that-does-not-exist',   // used for testing
				//     'an-empty-sheet',    // used for testing
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
				sheetnames.forEach(function(sheet, i){
					try {
						// try to update from feed
						staticContent[sheet] = data[sheet].elements;
						if (!staticContent[sheet].length) {
							throw "No entries found. Are there empty rows in the sheet?";
						}
						
						// store result in localstorage for fast access next time
						theDataService.setObject('staticcontent.' + sheet, staticContent[sheet]);
						
						
						console.log(sheet + "..." + JSON.stringify(staticContent[sheet]));
					} catch (error) {
						console.log("Can't read sheet '" + sheet + "'. Using local client cache. " + error);
					}     
				});
		}
	}

/*********************** Controller Configuration Section **************************/
/***********************************************************************************/
cortexConfig.controller('appCtrl', appCtrl)
cortexConfig.controller('loginCtrl', loginCtrl)
cortexConfig.controller('dictionaryCtrl', dictionaryCtrl)
cortexConfig.controller('AppLibraryCtrl',AppLibraryCtrl)
cortexConfig.controller('DiscoverCtrl', DiscoverCtrl)
cortexConfig.controller('SearchResultsCtrl',SearchResultsCtrl)
cortexConfig.controller('DiscoverEventsCtrl',DiscoverEventsCtrl)
cortexConfig.controller('MyLearningCtrl',MyLearningCtrl)
cortexConfig.controller('ResourceCtrl',ResourceCtrl)
cortexConfig.controller('TechtipsCtrl',TechtipsCtrl)

/***************************Service & Factory********************************************************/
/****************************************************************************************************/

//cortexConfig.service()


/*********************** Directives Configuration Section **************************/
/***********************************************************************************/

cortexConfig.directive('ionAlphaScroll',ionAlphaScroll)
/***********************************************************************************/
/***********************************************************************************/

/**********************************************************************************/
/**********************COMMON CODE For all applications****************************/
/**********************************************************************************/
/*cortexConfig.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    		}]);	
cortexConfig.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('LS-cortexConfig');
}]);
/**********************************************************************************/
/**********************************************************************************/

cortexConfig.run(function($ionicPopup) {
  var deploy = new Ionic.Deploy();
  console.log("in wathcer..")
  console.log(JSON.stringify(deploy));
  deploy.watch().then(function() {}, function() {}, function(updateAvailable) {
    console.log("updateAvailable.." + updateAvailable);
    if (updateAvailable) {
      deploy.download().then(function() {
        deploy.extract().then(function() {
          deploy.unwatch();
          $ionicPopup.show({
            title: 'New version available!',
            subTitle: 'Ready to use the latest features?',
            buttons: [
              { text: 'Not now' },
              {
                text: 'Yes',
                type: 'button-positive',
                onTap: function(e) {
                  deploy.load();
                }
              }
            ]
          });
        });
      });
    }
  });
});
