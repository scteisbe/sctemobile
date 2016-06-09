var cortexConfig = angular.module('cortexConfig', ['ionic','ionic-ratings', 'ionic-datepicker', 
                                                    'ionic.contrib.drawer',
                                                    'ngHolder','scteApp.services',
                                                     'ngStorage'
                                                    //,'scteApp.staticservices'
                                                    ]);

cortexConfig.config(appRoute)


cortexConfig.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    	cordova.plugins.Keyboard.disableScroll(true);

    } 
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
  }
});	
});

cortexConfig.config(function($ionicConfigProvider) {
    // force Android tabs to bottom
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.backButton.icon('ion-chevron-left');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    // $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.backButton.previousTitleText(false);
})

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
