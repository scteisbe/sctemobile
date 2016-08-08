var loginCtrl = ['$scope', '$state', '$rootScope', '$localStorage', 'Utils', 'StaticService', '$timeout', '$location',
 '$ionicHistory', 'AppConstants', function($scope, $state, $rootScope, $localStorage, Utils, StaticService, $timeout, $location, $ionicHistory, AppConstants) {

    $scope.fetchCableLabData = function() {
        console.log("In fetchCableLabData()..");
        Utils.doHttpRequest(Utils.getApiDetails().getCableLabAPI.httpMethod, Utils.getApiDetails().BaseURL + Utils.getApiDetails().getCableLabAPI.contexPath, Utils.getHttpHeader(), []).then(function(response) {
            if (response != null) {
                $message = response['message'];
                var res = response['data'];
                if ($message['statusCode'] == 200) {
                    angular.forEach(res, function(data) {
                        $scope.rssFeeds = data.rssFeedData.item;
                        $scope.nctaDatas = data.nctaData;
                        $rootScope.scraperData = data.scraperData;
                        $localStorage["rssFeeds"] = $scope.rssFeeds;
                        $localStorage["nctaDatas"] = $scope.nctaDatas;
                        $localStorage["scraperData"] = $rootScope.scraperData;
                    })
                }
            }
        });
    };

    $scope.fetchResources = function() {

        // This is for getGlossary.
        $headerParamArr.push({ "authToken": $localStorage['authToken'] });
        $headerParamArr.push({ "authType": "Bearer" });
        $headerParamArr.push({ "Content-Type": "application/json" });
        if ($rootScope.online) {
            Utils.doHttpRequest(Utils.getApiDetails().getGlossaryAPI.httpMethod, Utils.getApiDetails().getGlossaryAPI.URL, $headerParamArr, []).then(function(response) {

                if (response != null) {
                    //data available from live API
                    $message = response['message'];
                    data = response['data'];
                    $scope.hideLoader();

                    if ($message['statusCode'] == 200) {
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


            // This call is for whitepapers. If else is placed here to stop it from calling the API again and again.
            // Test to see if data persist.


            Utils.doHttpRequest(Utils.getApiDetails().whitepaperAPI.httpMethod, Utils.getApiDetails().whitepaperAPI.URL, $headerParamArr, []).then(function(response) {
                if (response != null) {
                    //data available from live API
                    $message = response['message'];
                    data = response['data'];
                    $scope.hideLoader();

                    if ($message['statusCode'] == 200) {

                        if (data != null) {
                            $localStorage["whitePapers"] = data;
                            $scope.whitePapers = data;
                        }
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

    /* Auto login code */
    $scope.init = function() {
        if ($localStorage["rssFeeds"] != null)
            $scope.rssFeeds = $localStorage["rssFeeds"];
        if ($localStorage["nctaDatas"] != null)
            $scope.nctaDatas = $localStorage["nctaDatas"];
        if ($localStorage["scraperData"] != null)
            $rootScope.scraperData = $localStorage["scraperData"];

        $scope.fetchCableLabData();
        $scope.fetchResources();

        if ($localStorage['authToken'] != null) {
            Utils.scteSSO();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('tab.discover');
            $rootScope.authToken = $localStorage['authToken'];
        }
    }
    $scope.init();

    // Just for developmet, need to remove before production release    
    $scope.username = 'tester@scte.org';
    $scope.password = 'scte1234';

    $scope.goLogin = 'no';

    $scope.newLogin = function(userName, password, rememberMe) {
        var valDefer = StaticService.fetchStaticData();
        valDefer.then(function() { $scope.login(userName, password, rememberMe); });
        // $timeout(function(){ $scope.login(userName, password, rememberMe);}, 20000);
    };

    $scope.login = function(username, password) {
        $scope.username = username;
        $scope.password = password;
        console.log("Username.." + $scope.username);
        console.log("Password.." + $scope.password);
        if ($scope.username == '' || $scope.password == '') {
            $scope.displayAlert(AppConstants.loginMissingInputData);
        } else {
            if ($rootScope.online) {
                $requestParamArr = [];
                $requestParamArr.push({ "UID": $scope.username });
                $requestParamArr.push({ "password": $scope.password });
                $requestParamArr.push({ "GrantType": "password" });
                $headerParamArr = [];
                $scope.showLoader();
                Utils.doHttpRequest('POST', 'https://devapi.scte.org/mobileappui/api/Token/PostToken', $headerParamArr, $requestParamArr).then(function(response) {
                    console.log("Response from the API ..." + response);
                    if (response != null) {
                        $message = response['message'];
                        $data = response['data'];
                        $scope.hideLoader();
                        if ($message['statusCode'] == 200) {
                            $rootScope.authToken = $data['access_token'];
                            $localStorage['username'] = $scope.username;
                            $localStorage['password'] = $scope.password;
                            $localStorage['authToken'] = $rootScope.authToken;

                            $scope.fetchResources();
                            $state.go('intro');
                        } else {
                            $scope.displayAlert(AppConstants.wrongUserNamePassword);
                        }
                    } else {
                        $scope.displayAlert(AppConstants.cantReachServer);
                        $scope.applicationGo = Utils.verifyUser($scope.username, $scope.password, $scope.userCred);
                        if ($scope.applicationGo == "yes") {
                            $state.go('intro');
                        }
                    }
                });
            } else {
                $scope.displayAlert(AppConstants.noInternet);
            }
        }
    };

    $scope.joinSCTE = function() {
        var myURL = encodeURI('http://www.scte.org/SCTE/Join/FastForms/CreateAccount.aspx');
        window.open(myURL, '_system');
    };

    $scope.forgotpassword = function() {
        var myURL = encodeURI('https://www.scte.org/SCTE/Sign_In.aspx');
        window.open(myURL, '_system');
    };

    $scope.redirect = function(pageName) {
        $rootScope.initialFocus = false;
        switch (pageName) {
            case 'discover':
                $location.path('tab/discover');
                break;
            case 'mylearning':
                $location.path('tab/mylearning');
                break;
            case 'techtips':
                $location.path('tab/techtips');
                break;
            case 'applibrary':
                $location.path('tab/applibrary');
                break;
            case 'resource':
                $location.path('tab/resource');
                break;
        }
    };
}];
