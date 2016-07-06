var cortexConfig = angular.module('cortexConfig', ['ionic', 'ionic-ratings', 'ionic-datepicker',
    'ngHolder', 'scteApp.services',
    'scteApp.staticservices',
    'ngStorage',
    'times.tabletop',
    'ionic.service.analytics'
]);

var deploy = new Ionic.Deploy();

cortexConfig.config(appRoute)

cortexConfig.run(function ($rootScope) {
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
       if($rootScope.globalVideoflag+"flag") {var state = 'pause';
        var div = document.getElementById("popupVid");
        var iframetemp = document.getElementsByTagName("iframe");
        for (i = 0; i < iframetemp.length; i++) {
            var iframe = document.getElementsByTagName("iframe")[i].contentWindow;
            div.style.display = state == 'hide' ? '' : '';
            func = 'pauseVideo';
            iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
        }
    }
    });
});

cortexConfig.run(['$ionicPlatform', 'StaticService', function ($ionicPlatform, StaticService) {

    //Fetch the data
//     console.log("Gauri:in run");
    //StaticService.initAPIContainer();
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

cortexConfig.run(['$ionicPlatform', '$ionicAnalytics', function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    $ionicAnalytics.register({
      silent: true,   // By default all analytics events are logged to the console for debugging. The silent flag disables this.
      dryRun: false   // dryRun=true won't send any events to the analytics backend. (useful during development)
    });
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

cortexConfig.config(function ($sceDelegateProvider) {
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
    
//     console.log("in wathcer..")
//     console.log(JSON.stringify(deploy));
    deploy.watch().then(function () { }, function () { }, function (updateAvailable) {
        console.log("updateAvailable.." + updateAvailable);
        if (updateAvailable) {
            deploy.download().then(function () {
                deploy.extract().then(function () {
                    deploy.unwatch();
                    $title = 'New version available!';
                    $message = 'Ready to use the latest features?';
                    if (navigator != null && navigator.notification != null) {
                        showConfirm($title,$message);
                    } else {
                        $ionicPopup.show({
                            title: $title,
                            subTitle: $message,
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
                    }
                });
            });
        }
    });
});

function showConfirm($title, $message) {
    navigator.notification.confirm(
        $message,  // message
        onConfirm,              // callback to invoke with index of button pressed
        $title,            // title
        'Yes,Not now'          // buttonLabels
    );
};

function onConfirm(buttonIndex) {
    if(buttonIndex == 1) {
        deploy.load();
    }
};