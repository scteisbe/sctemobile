  var cortexConfig = angular.module('cortexConfig', ['ionic', 'ionic-ratings', 'ionic-datepicker',
    'ngHolder',
    'ngStorage',
    'times.tabletop',
    'ionic.service.analytics', 
    'ionic.contrib.ui.tinderCards'
]);

var deploy = new Ionic.Deploy();

cortexConfig.config(appRoute)

cortexConfig.run(['$rootScope', '$location', '$window', '$ionicPlatform', '$state', '$ionicPopup','$localStorage', 
    function($rootScope, $location, $window, $ionicPlatform, $state, $ionicPopup, $localStorage) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        // if ($rootScope.globalVideoflag + "flag") {
        //     var state = 'pause';
        //     var div = document.getElementById("popupVid");
        //     var iframetemp = document.getElementsByTagName("iframe");
        //     for (i = 0; i < iframetemp.length; i++) {
        //         var iframe = document.getElementsByTagName("iframe")[i].contentWindow;
        //         div.style.display = state == 'hide' ? '' : '';
        //         func = 'stopVideo';
        //         iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
        //     }
        // }
    });
    
    var clientId = $localStorage['clientId'] || _.random(1, true).toString().replace("0.", "");
    $localStorage['clientId'] = clientId;

    $window.ga('create', 'UA-1851425-10', {
      'storage': 'none',
      'clientId': clientId
    });
    
    $window.ga('set', 'checkProtocolTask', null); // Disable file protocol checking because Ionic serves from file:// on actual devices

    $rootScope.$on('$stateChangeSuccess', function(event) {    
      setTimeout(function() {
          $window.ga('send', 'pageview', $location.path());
      },300)
    });

//Network event listener
    
    $rootScope.online = navigator.onLine;
    $rootScope.online = true;
    $window.addEventListener("offline", function () {
    $rootScope.$apply(function() {
        $rootScope.online = false;
    });
    }, false);
    $window.addEventListener("online", function () {
    $rootScope.$apply(function() {
        $rootScope.online = true;
    });
    }, false);
    

    /* $ionicPlatform.registerBackButtonAction(function(e) {
         e.preventDefault();
         function showConfirm() {
             var confirmPopup = $ionicPopup.show({
                             title: 'Alert',
                             subTitle: 'Are you sure you want to exit?',
                             buttons: [{
                                 text: 'Exit',
                                 onTap: function(e) {
                                     ionic.Platform.exitApp();
                                 }
                             }, {
                                 text: 'No',
                                 type: 'button-positive'
                             }]
                         });
         };
          // Is there a page to go back to?
         showConfirm();
         return false;
     }, 101);*/


}]);

cortexConfig.run(['$ionicPlatform', 'StaticService', function($ionicPlatform, StaticService) {

    //Fetch the data
    //     console.log("Gauri:in run");
    //StaticService.initAPIContainer();
    StaticService.fetchStaticData();
    $ionicPlatform.ready(function() {
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

cortexConfig.run(['$ionicPlatform', '$ionicAnalytics', function($ionicPlatform, $ionicAnalytics) {
    $ionicPlatform.ready(function() {
        $ionicAnalytics.register({
            silent: false, // By default all analytics events are logged to the console for debugging. The silent flag disables this.
            dryRun: false // dryRun=true won't send any events to the analytics backend. (useful during development)
        });
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
cortexConfig.config(['TabletopProvider', function(TabletopProvider) {
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
cortexConfig.controller('introCtrl', introCtrl)
cortexConfig.controller('dictionaryCtrl', dictionaryCtrl)
cortexConfig.controller('AppLibraryCtrl', AppLibraryCtrl)
cortexConfig.controller('DiscoverCtrl', DiscoverCtrl)
cortexConfig.controller('DiscoverEventCtrl', DiscoverEventCtrl)
cortexConfig.controller('SearchResultsCtrl', SearchResultsCtrl)
cortexConfig.controller('DiscoverEventsDetailCtrl', DiscoverEventsDetailCtrl)
cortexConfig.controller('MyLearningCtrl', MyLearningCtrl)
cortexConfig.controller('ResourceCtrl', ResourceCtrl)
cortexConfig.controller('TechtipsCtrl', TechtipsCtrl)
cortexConfig.controller('TechtipsCtrlTitle', TechtipsCtrlTitle)

/***************************Service & Factory********************************************************/
/****************************************************************************************************/

cortexConfig.factory('StaticService', StaticService)
cortexConfig.factory('Utils', Utils)


//cortexConfig.service()


/*********************** Directives Configuration Section **************************/
/***********************************************************************************/

//cortexConfig.directive('ionAlphaScroll', ionAlphaScroll)
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

cortexConfig.run(function($ionicPopup) {

    //     console.log("in wathcer..")
    //     console.log(JSON.stringify(deploy));
    deploy.watch().then(function() {}, function() {}, function(updateAvailable) {
        console.log("updateAvailable.." + updateAvailable);
        if (updateAvailable) {
            deploy.download().then(function() {
                deploy.extract().then(function() {
                    deploy.unwatch();
                     deploy.load();
                });
            });
        }
    });
});
