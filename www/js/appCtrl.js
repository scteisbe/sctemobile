var appCtrl = ['$state', '$rootScope', '$scope', '$compile', '$filter', '$ionicLoading', 
                '$ionicPopup', 'Utils', '$window', '$localStorage','AppConstants',
    function($state, $rootScope, $scope, $compile, $filter, $ionicLoading, $ionicPopup, 
                Utils, $window,$localStorage,AppConstants) {

    $rootScope.initialFocus=false;
    $rootScope.ssoCompleted = false;

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
        // console.info(JSON.stringify(ionic.Platform.device()));
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

    $scope.fetchCableLabData = function() {
        Utils.doHttpRequest(Utils.getApiDetails().getCableLabAPI.httpMethod, Utils.getApiDetails().BaseURL + 
                            Utils.getApiDetails().getCableLabAPI.contexPath, Utils.getHttpHeader(), [])
                            .then(function(response) {
            if (response != null) {
                $message = response['message'];
                var res = response['data'];
                if ($message['statusCode'] == AppConstants.status200) {
                    angular.forEach(res, function(data) {
                        $rootScope.rssFeeds = data.rssFeedData.item;
                        $rootScope.nctaDatas = data.nctaData;
                        $rootScope.scraperData = data.scraperData;
                        $localStorage["rssFeeds"] = $rootScope.rssFeeds;
                        $localStorage["nctaDatas"] = $rootScope.nctaDatas;
                        $localStorage["scraperData"] = $rootScope.scraperData;
                    })
                }
            }
        });
    };

    $scope.fetchResources = function() {
        $headerParamArr.push({ "authToken": $localStorage['authToken'] });
        $headerParamArr.push({ "authType": "Bearer" });
        $headerParamArr.push({ "Content-Type": "application/json" });
        if ($rootScope.online) {
            
            // This call is for whitepapers. If else is placed here to stop it from calling the API again and again.
            // Test to see if data persist.

            Utils.doHttpRequest(Utils.getApiDetails().whitepaperAPI.httpMethod, 
                                Utils.getApiDetails().BaseURL + Utils.getApiDetails().whitepaperAPI.contexPath, 
                                $headerParamArr, []).then(function(response) {
                if (response != null) {
                    //data available from live API
                    $message = response['message'];
                    data = response['data'];
                    //$scope.hideLoader();

                    if ($message['statusCode'] == AppConstants.status200) {

                        if (data != null) {
                            $localStorage["whitePapers"] = data;
                            $scope.whitePapers = data;
                        }

                         // This is for getGlossary.
                
                         Utils.doHttpRequest(Utils.getApiDetails().getGlossaryAPI.httpMethod, 
                                Utils.getApiDetails().BaseURL + Utils.getApiDetails().getGlossaryAPI.contexPath, 
                                $headerParamArr, []).then(function(response) {
                                        
                            if (response != null) {
                                //data available from live API
                                $message = response['message'];
                                data = response['data'];
                                $scope.hideLoader();

                                if ($message['statusCode'] == AppConstants.status200) {
                                    if (data != null) {
                                        $localStorage["dictionarywords"] = data;
                                    }
                                }
                            } else {
                                //No API access
                                $scope.hideLoader();
                                //display data from stub
                                $localStorage["dictionarywords"] = $scope.dictionarywordsStub;
                            }
                        });
                    }
                } else {
                    //No API access
                    $scope.hideLoader();
                    //display data from stub
                    $localStorage["whitePapers"] = $scope.whitePapersStub;
                }
            });

        } else {
            $scope.hideLoader();
            $scope.displayAlert(AppConstants.noInternet);

        }
    };


    $scope.fetchCableLabData();

    if ($localStorage['authToken'] != null) {
        $rootScope.authToken = $localStorage['authToken'];
        $scope.fetchResources();
        if ($localStorage['SSOUrl'] != null) {
            Utils.scteSSO();
        }
        //$state.go(AppConstants.tabdiscoverName);
    }
}];
