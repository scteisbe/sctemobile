var appCtrl = ['$state', '$rootScope', '$scope', '$compile', '$filter', '$ionicLoading', 
                '$ionicPopup', 'Utils', '$window',
    function($state, $rootScope, $scope, $compile, $filter, $ionicLoading, $ionicPopup, Utils, $window) {

    $rootScope.initialFocus=false;

    /*-----------Ionic Loader----------------*/
    $scope.showLoader = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner>'
        });
    };

    $scope.showLoaderSearch = function() {
        $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner><br><a class="button button-small button-positive" ui-sref="tab.discover">Cancel Search</a>'

        });
        };

    $scope.$on('$ionicView.loaded', function() {
        ionic.Platform.ready(function() {
            if (navigator && navigator.splashscreen) navigator.splashscreen.hide();
        });
    });

    $scope.hideLoader = function() {
        $ionicLoading.hide();
    };

    $scope.displayAlert = function($message) {
        $ionicLoading.hide();

        if (navigator != null && navigator.notification != null) {
            navigator.notification.alert(
                $message, // message
                alertDismissed, // callback
                'Alert', // title
                'OK' // buttonName
            );
        } else {
            $ionicPopup.alert({
                title: 'Alert',
                content: $message,
                buttonName: 'OK'
            }).then(function() {});
        }
    };

    function alertDismissed() {
        
    }

    $scope.getRequestHeader = function() {
        $headerParamArr = [];
        $headerParamArr.push({ "authToken": $rootScope.authToken });
        $headerParamArr.push({ "authType": "Bearer" });
        return $headerParamArr;
    }

    $scope.openPage = function(url) {
        if (!url.match(/^[a-zA-Z]+:\/\//)) {
            url = 'http://' + url;
        }
        window.open(url, '_system');
    };

    $scope.cortexLogo = '<img src="img/cortex_logo.png" class="header-cortex-logo">';
    
    $scope.openInAppBrowser = function(url) {
        window.open(url, '_blank', 'location=yes');
    };
    
     $scope.openExternalBrowser = function(url) {
        window.open(item.url, '_system');
    };

    // var scheme;
 
    // // Don't forget to add the org.apache.cordova.device plugin!
    // if($window.device) {
    //     if($window.device.platform === 'iOS') {
    //         scheme = 'lyft-taxi-app-alternative://';
    //     }
    //     else if(device.platform === 'Android') {
    //         scheme = 'me.lyft.android';
    //     }
        
    //     appAvailability.check(
    //         scheme, // URI Scheme
    //         function() {  // Success callback
    //             window.open('lyft-taxi-app-alternative://', '_system', 'location=no');
    //         },
    //         function() {  // Error callback
    //             window.open('https://www.lyft.com', '_system', 'location=no');
    //         }
    //     ); 
    // }
}];
