var DiscoverCtrl = ['$scope', '$state', '$rootScope', '$http', '$ionicModal', '$ionicLoading', 'Utils', '$localStorage', '$sce', '$window', '$ionicHistory', function($scope, $state, $rootScope, $http, $ionicModal, $ionicLoading, Utils, $localStorage, $sce, $window, $ionicHistory) {
    //$ionicHistory.clearHistory();
    $scope.staticContent = [];
    $scope.platform = ionic.Platform.platform();
    $scope.username = $localStorage['username'];
    $scope.voiceFlag = false;
    $scope.recognitionStopped = false;
    $scope.previousSearches = $localStorage["PreviousSearch"];



    var sheetnames = [
        'announcements',
        'featuredresources',
    ];

    $requestParamArr = [];

    $scope.init = function() {
        $scope.fetchProfile();
    }

    $scope.voiceRecog = function() {
        $scope.voiceFlag = true;
        var maxMatches = 5;
        var promptString = "Please Speak now"; // optional
        var language = "en-US"; // optional

        window.plugins.speechrecognizer.startRecognize(function(result) {
            console.log("voiceRecog...received result..");
            console.log(result);
            $scope.query = result[0];
            $scope.$apply();
            if ($scope.voiceFlag && $scope.query) {
                $scope.searchResults();
            }
        }, function(errorMessage) {
            console.log("Error message: " + errorMessage);
        }, maxMatches, promptString, language);
    }

    $scope.openPromo = function(url) {
        ga('send', 'event', 'Promo banner', 'Opened from discover tab', url);
        window.open(url, '_system');
    };

    $scope.openURL = function(item) {
        ga('send', 'event', item.type, 'Opened from featured resources', item.title);
        window.open(item.url, '_system');
    };

    $scope.withinDates = function(startDate, endDate) {
        var currentDate = new Date();
        //check if current date is within given dates
        if (currentDate >= new Date(startDate) && currentDate <= new Date(endDate)) {
            return true;
        } else {
            return false;
        }

    };
    // immediately populate from localStorage
    sheetnames.forEach(function(sheet, i) {
        $scope.staticContent[sheet] = $localStorage['staticcontent.' + sheet];
    });

    $scope.getCobrandingURL = function(compId) {
        for (var i = 0; i < $scope.cobrandingRecords.length; i++) {
            if ($scope.cobrandingRecords[i].companyid == compId) {
                return $scope.cobrandingRecords[i].logourl;
            }
        }
    };

    $scope.fetchProfile = function() {
        if ($rootScope.online) {
            Utils.doHttpRequest(Utils.getApiDetails().getIndividualAPI.httpMethod, Utils.getApiDetails().BaseURL + Utils.getApiDetails().getIndividualAPI.contexPath, Utils.getHttpHeader(), $requestParamArr).then(function(response) {
                console.log("in fetchProfile()..Got response in GetIndividual..");
                //console.log(response);
                if (response != null) {
                    $message = response['message'];
                    $data = response['data'];
                    console.log("in fetchProfile() statusCode.." + $message['statusCode']);
                    $scope.hideLoader();

                    if ($message['statusCode'] == 401 || $message['statusCode'] == 105) {
                        Utils.autoLogin().then(function(response) {

                            if (response != null) {
                                $message = response['message'];
                                if ($message['statusCode'] == 200) {
                                    $rootScope.authToken = $localStorage['authToken'];
                                    $scope.fetchProfile();
                                }
                            }
                        });
                    } else if ($message['statusCode'] == 200) {
                        $rootScope.profileData = $data[0];
                        $profileData = $data[0];
                        $localStorage['profiledata'] = $profileData;

                        if ($localStorage['SSOUrl'] == null) {
                            $localStorage['SSOUrl'] = $profileData['SSOUrl'];
                            Utils.scteSSO();
                        }
                        $localStorage['SSOUrl'] = $profileData['SSOUrl'];
                        $localStorage["myLearning"] = $profileData.LearningPlan;
                        console.log("in fetchProfile()..SSOUrl.." + $localStorage['SSOUrl']);
                        console.log("in fetchProfile()..FirstName.." + $profileData['FirstName']);
                        $scope.username = $profileData['FirstName'];
                        $scope.cobrandingRecords = $localStorage['staticcontent.cobranding'];
                        $scope.logoURL = $scope.getCobrandingURL($profileData['CompanyId']);
                        console.log("Logo URL is here : " + $scope.logoURL);
                        $window.ga('set', 'userId', $profileData['Id']);
                        $localStorage['games'] = $profileData.Games;
                        console.log("Games from API.." + $localStorage['games'].length);
                    }
                }
            });
        } else {
             $scope.displayAlert("Internet not available. Please check network connectivity.");
        }

    };


    console.log("user name stored is :--" + $localStorage['username']);

    console.log("Loaded static content from local cache.");

    $profileData = $localStorage['profiledata'];
    $eventsData = $localStorage['eventsdata'];

    if ($profileData == null || $eventsData == null) {
        $scope.showLoader();
    } else {
        if ($profileData != null) {
            $scope.username = $profileData['FirstName'];
        }
        if ($eventsData != null) {
            $scope.events = $eventsData['liveLearnings'];
        }
    }


    $scope.query = '';
    $scope.searchResults = function(query) {

        if ($scope.voiceFlag && $scope.query) {
            $scope.addSearchHistory($scope.query);
            $state.go("tab.searchresults");
        }

        if (event.keyCode == 13 && query != '') {
            $scope.addSearchHistory(query);
            $state.go("tab.searchresults");
        }

        if (query.oldSearch) {
            //$scope.hideRecentSearches();
            $scope.addSearchHistory(query.searchText);
            $state.go("tab.searchresults");
        }
    };

    $scope.addSearchHistory = function(queryElement) {
        var srhArr = [];
      
        if($localStorage["PreviousSearch"] != undefined){
            srhArr = srhArr.concat($localStorage["PreviousSearch"]);
        } 

        $localStorage["PreviousSearch"] = '';

        //This is to check for the duplicate values.
        var elementIndex = srhArr.indexOf(queryElement);
        if (elementIndex > -1) {
            srhArr.splice(elementIndex, 1);
        }

        if ((srhArr.length / 10) >= 1) {
            srhArr.pop();
            srhArr.unshift(queryElement);
        } else {
            srhArr.unshift(queryElement);
        }
        $localStorage["PreviousSearch"] = srhArr;
    };

    $scope.clearSearchField = function() {
        $scope.query = '';
    };

    // Recent search modal
    $ionicModal.fromTemplateUrl('templates/discover/recent-searches.html', {
        scope: $scope,
        animation: 'slide-in-up '
    }).then(function(modal) {
        $scope.modalRecentSearches = modal;
    });
    $scope.showRecentSearches = function() {
        $scope.modalRecentSearches.show();
    };
    $scope.hideRecentSearches = function() {
        $scope.modalRecentSearches.hide();
    };
    $scope.searchChange = function() {
        if ($scope.query && $scope.query.length) {
            $scope.modalRecentSearches.hide();
        } else {
            $scope.modalRecentSearches.show();
        }
    };

    $scope.viewProfile = function() {
        $state.go('tab.myprofile');

    };

    $scope.goButton = function() {
        $state.go('tab.searchresults');
    };

    $scope.fetchIonicDeployInfo = function() {
        var deploy = new Ionic.Deploy();
        console.log("into fetchIonicDeployInfo()..");
        //console.log(deploy);
        deploy.info().then(function(deployInfo) {
            console.log("deployInfo..");
            console.log(deployInfo);
            $scope.displayAlert("UUID : " + deployInfo.deploy_uuid);
        }, function() {
            console.log("into fetchIonicDeployInfo()..2nd");
        }, function() {
            console.log("into fetchIonicDeployInfo()..3rd");
        });

        deploy.getVersions().then(function(versions) {
            console.log("versions..");
            console.log(versions);
        });
    };

    $scope.items = [{
        "img": "img/100x100.png",
        "title": "Lorem Ipsum Dolor Sit"
    }, {
        "img": "img/100x100.png",
        "title": "Lorem Ipsum Dolor Sit"
    }, {
        "img": "img/100x100.png",
        "title": "Lorem Ipsum Dolor Sit"
    }, {
        "img": "img/100x100.png",
        "title": "Lorem Ipsum Dolor Sit"
    }, {
        "img": "img/100x100.png",
        "title": "Lorem Ipsum Dolor Sit"
    }, {
        "img": "img/100x100.png",
        "title": "Lorem Ipsum Dolor Sit"
    }, {
        "img": "img/100x100.png",
        "title": "Lorem Ipsum Dolor Sit"
    }, {
        "img": "img/100x100.png",
        "title": "Lorem Ipsum Dolor Sit"
    }, {
        "img": "img/100x100.png",
        "title": "Lorem Ipsum Dolor Sit"
    }, {
        "img": "img/100x100.png",
        "title": "Lorem Ipsum Dolor Sit"
    }];

    $scope.rssFeedDetailScreen = function() {
        $state.go('tab.rssfeeds');
    };

    /*$scope.rssFeeds = [{
        "title": "Title 1",
        "publishedDate": "18/07/2016",
        "description": "Lorem Ipsum"
    }, {
        "title": "Title 2",
        "publishedDate": "19/07/2016",
        "description": "Lorem Ipsum"
    }, {
        "title": "Title 3",
        "publishedDate": "20/07/2016",
        "description": "Lorem Ipsum"
    }, {
        "title": "Title 4",
        "publishedDate": "21/07/2016",
        "description": "Lorem Ipsum"
    }, {
        "title": "Title 5",
        "publishedDate": "22/07/2016",
        "description": "Lorem Ipsum"
    }];*/
    /*$scope.rssFeeds = function() {

    };*/

    /*$scope.rssFeedLink = function() {

    };*/

    $scope.openPage = function(url) {
        window.open(url, '_system');
    };

}];
