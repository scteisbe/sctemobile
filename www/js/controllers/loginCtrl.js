var loginCtrl = ['$scope', '$state', '$rootScope', '$localStorage', 'Utils', 'StaticService', '$timeout', '$location',
 '$ionicHistory', 'AppConstants', function($scope, $state, $rootScope, $localStorage, Utils, StaticService, $timeout, 
 $location, $ionicHistory, AppConstants) {

console.log("in Login Controller..");
    /* Auto login code */
    $scope.init = function() {
        console.log("in init :: Login Controller..");
        if ($localStorage["rssFeeds"] != null)
            $rootScope.rssFeeds = $localStorage["rssFeeds"];
        if ($localStorage["nctaDatas"] != null)
            $rootScope.nctaDatas = $localStorage["nctaDatas"];
        if ($localStorage["scraperData"] != null)
            $rootScope.scraperData = $localStorage["scraperData"];

        if ($localStorage['authToken'] != null) {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
        }
    }

    $scope.init();
    

    // Just for developmet, need to remove before production release    
    // $scope.username = 'tester@scte.org';
    // $scope.password = 'scte1234';

    $scope.goLogin = 'no';

    $scope.newLogin = function(userName, password, rememberMe) {
        var valDefer = StaticService.fetchStaticData();
        valDefer.then(function() { $scope.login(userName, password, rememberMe); });
        // $timeout(function(){ $scope.login(userName, password, rememberMe);}, 20000);
    };

    $scope.login = function(username, password) {
        $scope.username = username;
        $scope.password = password;
        if ($scope.username == '' || $scope.password == '') {
            $scope.displayAlert(AppConstants.loginMissingInputData);
        } else {
            if ($rootScope.online) {
                console.log("$scope.username....before==" + $scope.username)
                if($scope.username.startsWith(".")) {
                    $localStorage["devMode"] = "1";
                    $scope.username = $scope.username.substring(1);
                } else {
                    $localStorage["devMode"] = "0"
                }

                if($localStorage["rssFeeds"] == null)
                    $scope.fetchCableLabData()

                console.log("$scope.username....after==" + $scope.username);
                $requestParamArr = [];
                $requestParamArr.push({ "UID": $scope.username });
                $requestParamArr.push({ "password": $scope.password });
                $requestParamArr.push({ "GrantType": "password" });
                $headerParamArr = [];
                $scope.showLoader();
                Utils.doHttpRequest(Utils.getApiDetails().loginAPI.httpMethod, 
                                    Utils.getApiDetails().BaseURL + Utils.getApiDetails().loginAPI.contexPath, 
                                    $headerParamArr, $requestParamArr).then(function(response) {
                    if (response != null) {
                        $message = response['message'];
                        $data = response['data'];
                        $scope.hideLoader();
                        if ($message['statusCode'] == AppConstants.status200) {
                            $rootScope.authToken = $data['access_token'];
                            $localStorage['username'] = $scope.username;
                            $localStorage['password'] = $scope.password;
                            $localStorage['authToken'] = $rootScope.authToken;

                            $state.go(AppConstants.introName);
                        } else {
                            $scope.displayAlert(AppConstants.wrongUserNamePassword);
                        }
                    } else {
                        $scope.displayAlert(AppConstants.cantReachServer);
                        $scope.applicationGo = Utils.verifyUser($scope.username, $scope.password, $scope.userCred);
                        if ($scope.applicationGo == "yes") {
                            $state.go(AppConstants.introName);
                        }
                    }
                });
            } else {
                $scope.displayAlert(AppConstants.noInternet);
            }
        }
    };

    $scope.joinSCTE = function() {
        var myURL = encodeURI(AppConstants.joinScteLink);
        window.open(myURL, AppConstants.system);
    };

    $scope.forgotpassword = function() {
        var myURL = encodeURI(AppConstants.forgotPasswordLink);
        // window.open(myURL, AppConstants.system);
        window.open(myURL, '_blank', 'location=yes');
    };

    $scope.redirect = function(pageName) {
        $rootScope.initialFocus = false;
        switch (pageName) {
            case AppConstants.discoverTitle:
                $location.path(AppConstants.tabDiscoverURLSub);
                break;
            case AppConstants.myLearningTitle:
                $location.path(AppConstants.tabmylearningURLSub);
                break;
            case AppConstants.techTipTitle:
                $location.path(AppConstants.tabtechtipsURLSub);
                break;
            case AppConstants.appLibraryTitle:
                $location.path(AppConstants.tabapplibraryURLSub);
                break;
            case AppConstants.resourcesTitle:
                $location.path(AppConstants.tabresourceURLSub);
                break;
        }
    };
}];
