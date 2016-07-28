var loginCtrl = ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', '$ionicPopup', '$localStorage', 'Utils', '$q', 'StaticService', '$timeout', '$window', '$location', '$ionicHistory', function($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup, $localStorage, Utils, $q, StaticService, $timeout, $window, $location, $ionicHistory) {
    
    $scope.fetchCableLabData = function() {
        console.log("in fetchCableLabData()..");
        Utils.doHttpRequest(Utils.getApiDetails().getCableLabAPI.httpMethod, Utils.getApiDetails().BaseURL + Utils.getApiDetails().getCableLabAPI.contexPath, Utils.getHttpHeader(), []).then(function(response) {
            //console.log("in fetchCableLabData()..Got response in GetIndividual..");
            if (response != null) {
                $message = response['message'];
                var res = response['data'];
               // console.log("in fetchCableLabData() statusCode.." + $message['statusCode']);
                if ($message['statusCode'] == 200) {
                    angular.forEach(res, function(data) {
                        $scope.rssFeeds = data.rssFeedData.item;
                        $rootScope.scraperData = data.scraperData;
                        //$scope.rssLink = data.rssFeedData.item.link;
                        
                        $localStorage["rssFeeds"] = $scope.rssFeeds;
                        $localStorage["scraperData"] = $rootScope.scraperData;
                        //console.log("Scraper Data Sesha "+$rootScope.scraperData);
                    })  
                }                
            }
        });
        
        // $http.get('json/cable-data.json').success(function(res) {
        //     //var a = res.rssFeedData.item;
        //     //$scope.rssFeeds = res.rssFeedData.feed;
        //     //console.log(a);
        //     angular.forEach(res, function(data) {
        //         $scope.rssFeeds = data.rssFeedData.item;
        //         //$scope.rssLink = data.rssFeedData.item.link;
        //         console.log($scope.rssFeeds);
        //     })
        // });
    };
    
    //Auto login code
    $scope.init = function() {
        console.log("in init :: loginCtrl");
        
        if($localStorage["rssFeeds"] != null)
            $scope.rssFeeds = $localStorage["rssFeeds"];
        if($localStorage["scraperData"] != null)
            $rootScope.scraperData = $localStorage["scraperData"];
            
        $scope.fetchCableLabData();
        
        if ($localStorage['authToken'] != null) {
            console.log("in loginCtrl :: localStorage...");
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

    //$scope.username = '';
    //$scope.password = '';

    $scope.goLogin = 'no';
    //Fetch the static data from google spreasheet
    // StaticService.fetchStaticData(); //todo - check for error
    $scope.newLogin = function(userName, password, rememberMe) {

        var valDefer = StaticService.fetchStaticData();
        valDefer.then(function() { $scope.login(userName, password, rememberMe); });


        // $timeout(function(){ $scope.login(userName, password, rememberMe);}, 20000);
    };

    $scope.login = function(userName, password, rememberMe) {
        //$state.go('tab.discover');
        console.log("username123.." + $scope.username);
        console.log("password.." + $scope.password);
            if ($scope.username == null || $scope.password == null) {
                $scope.displayAlert("Missing input data !");
            } else {
                if ($rootScope.online) {
                    $requestParamArr = [];
                    $requestParamArr.push({ "UID": $scope.username });
                    $requestParamArr.push({ "password": $scope.password });
                    $requestParamArr.push({ "GrantType": "password" });

                    $headerParamArr = [];
                    $scope.showLoader();
                    Utils.doHttpRequest('POST', 'https://devapi.scte.org/mobileappui/api/Token/PostToken', $headerParamArr, $requestParamArr).then(function(response) {
                        console.log("response from the API ..." + response);
                        // to be deleted.
                        // $state.go('tab.discover');
                        if (response != null) {
                            $message = response['message'];
                            $data = response['data'];
                            console.log("statusCode.." + $message['statusCode']);
                            $scope.hideLoader();

                            if ($message['statusCode'] == 200) {
                                //Utils.scteSSO();
                                $rootScope.authToken = $data['access_token'];
                                $localStorage['username'] = $scope.username;
                                $localStorage['password'] = $scope.password;
                                $localStorage['authToken'] = $rootScope.authToken;
                                console.log("authToken.." + $rootScope.authToken);
                                $state.go('intro');


                            } else {
                                $scope.displayAlert("Wrong username or password !");
                            }
                        } else {
                            console.log("into else of Login Controller..");
                            $scope.displayAlert("Can't reach server !");
                            $scope.applicationGo = Utils.verifyUser($scope.username, $scope.password, $scope.userCred);
                            console.log("user credentials verified");
                            if ($scope.applicationGo == "yes") {
                                //$localstorage.setObject('username', $scope.username);
                                //console.log("Username in the $scope :" +$localStorage['username']);
                                $state.go('intro');
                            }
                        }
                    });
                } else {
                    $scope.displayAlert("Internet not available. Please check network connectivity.");
                }
            }
    };

    $scope.redirect = function(pageName) {

        switch (pageName) {
            case 'discover':
                $location.path('tab/discover');
                break;
            case 'mylearning':
                $location.path('tab/mylearning');
                break;
            case 'techtips':
                // if($rootScope.globalVideoflag=='true'){
                //  var state = 'pause';
                //  $state.go('tab.techtips');var div = document.getElementById("popupVid");
                //                   var iframetemp = document.getElementsByTagName("iframe");
                //                  for (i = 0; i < iframetemp.length; i++) {
                //                  var iframe = document.getElementsByTagName("iframe")[i].contentWindow;

                //                       div.style.display = state == 'hide' ? '' : '';
                //                      func = 'stopVideo';
                //                      iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
                //                                                               }
                //                                      }
                // else{
                $location.path('tab/techtips');
                //}
                break;
            case 'applibrary':
                $location.path('tab/applibrary');
                break;
            case 'resource':
                $location.path('tab/resource');
                break;
        }
    };


    $scope.joinSCTE = function() {
        var myURL = encodeURI('http://www.scte.org/SCTE/Join/FastForms/CreateAccount.aspx');
        window.open(myURL, '_system');
        //$window.open('', "_system");
        //$window.open.href = "http://www.scte.org/SCTE/Join/FastForms/CreateAccount.aspx";
    };

    $scope.forgotpassword = function() {
        var myURL = encodeURI('https://www.scte.org/SCTE/Sign_In.aspx');
        window.open(myURL, '_system');
        //$window.open('', "_system");
    };
}];
