var cortexConfig = angular.module('cortexConfig', ['ionic', 'ionic-ratings', 'ionic-datepicker',
                                                    'ngHolder', 'scteApp.services',
                                                    'scteApp.staticservices',
                                                     'ngStorage',
                                                     'times.tabletop'
                                                    ]);

cortexConfig.config(appRoute)

cortexConfig.run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        console.log("in state change");
        var div = document.getElementsByTagName("video");
       for(i=0;i<div.length;i++){
        div[i].pause();
       }
    });
});

cortexConfig.run(['$ionicPlatform', 'StaticService', function ($ionicPlatform, StaticService) {

    //Fetch the data
    console.log("Gauri:in run");
    StaticService.fetchStaticData();
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }

    });
}]);

cortexConfig.config(function ($ionicConfigProvider) {
    // force Android tabs to bottom
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-left');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.backButton.text('Back');
    $ionicConfigProvider.backButton.previousTitleText(false);
});

// To read the data from google spreadshee.
cortexConfig.config(['TabletopProvider', function (TabletopProvider) {
    TabletopProvider.setTabletopOptions({
        //key: '1_-dt2DoMrDJZ0MR57Ysh6m6HyEn2UE80ckH-7ALx2nI',
        key: '1KTe0AcWPrApY8qOzTV_lJrftDxo0ZDRB7DYtzZfvFLY',
        simpleSheet: false,
        //callback: $storeDataProvider.storeData,
    });
  }]);



/*********************** Controller Configuration Section **************************/
/***********************************************************************************/
cortexConfig.controller('appCtrl', appCtrl)
cortexConfig.controller('loginCtrl', loginCtrl)
cortexConfig.controller('dictionaryCtrl', dictionaryCtrl)
cortexConfig.controller('AppLibraryCtrl', AppLibraryCtrl)
cortexConfig.controller('DiscoverCtrl', DiscoverCtrl)
cortexConfig.controller('DiscoverEventCtrl', DiscoverEventCtrl)
cortexConfig.controller('SearchResultsCtrl', SearchResultsCtrl)
cortexConfig.controller('DiscoverEventsCtrl', DiscoverEventsCtrl)
cortexConfig.controller('MyLearningCtrl', MyLearningCtrl)
cortexConfig.controller('ResourceCtrl', ResourceCtrl)
cortexConfig.controller('TechtipsCtrl', TechtipsCtrl)
cortexConfig.controller('TechtipsCtrlTitle', TechtipsCtrlTitle)

/***************************Service & Factory********************************************************/
/****************************************************************************************************/

//cortexConfig.service()


/*********************** Directives Configuration Section **************************/
/***********************************************************************************/

cortexConfig.directive('ionAlphaScroll', ionAlphaScroll)
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

cortexConfig.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.youtube.com/**',
    'https://devapi.scte.org/**'
  ]);

  // The blacklist overrides the whitelist so the open redirect here is blocked.
  $sceDelegateProvider.resourceUrlBlacklist([
    'http://myapp.example.com/clickThru**'
  ]);
});

cortexConfig.run(function ($ionicPopup) {
    var deploy = new Ionic.Deploy();
    console.log("in wathcer..")
    console.log(JSON.stringify(deploy));
    deploy.watch().then(function () {}, function () {}, function (updateAvailable) {
        console.log("updateAvailable.." + updateAvailable);
        if (updateAvailable) {
            deploy.download().then(function () {
                deploy.extract().then(function () {
                    deploy.unwatch();
                    $ionicPopup.show({
                        title: 'New version available!',
                        subTitle: 'Ready to use the latest features?',
                        buttons: [
                            {
                                text: 'Not now'
                            },
                            {
                                text: 'Yes',
                                type: 'button-positive',
                                onTap: function (e) {
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