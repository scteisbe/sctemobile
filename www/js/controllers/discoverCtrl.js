var DiscoverCtrl = ['$scope', '$state', '$rootScope', '$http', '$ionicModal', '$ionicLoading', 'Utils', '$localStorage', '$sce', '$window', '$ionicHistory', 'AppConstants', function($scope, $state, $rootScope, $http, $ionicModal, $ionicLoading, Utils, $localStorage, $sce, $window, $ionicHistory, AppConstants) {
    $scope.staticContent = [];
    $scope.platform = ionic.Platform.platform();
    $scope.displayName = $localStorage['displayName'];
    $scope.voiceFlag = false;
    $scope.recognitionStopped = false;
    $scope.previousSearches = $localStorage["PreviousSearch"];
    $scope.isAndroid = ionic.Platform.isAndroid();

    $scope.ionicUpdate = function() {
        var deploy = new Ionic.Deploy();
        // deploy.setChannel = 'dev';

        deploy.getVersions().then(function(versions) {
          deploy.info().then(function(deployInfo) {
            console.log("Current: " + deployInfo.deploy_uuid);
            console.log(versions);
          }, function() {}, function() {});

        });
        deploy.watch().then(function () { }, function () { }, function (updateAvailable) {
          // deploy.check().then(function (updateAvailable) {
            console.log("updateAvailable.." + updateAvailable);
            if (updateAvailable) {
                deploy.download().then(function () {
                    deploy.extract().then(function () {
                        deploy.unwatch();
                        $title = 'New version available!';
                        $message = 'Ready to use the latest features?';
                        showConfirm($title,$message);
                    });
                });
            }
        });
    }

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
            ga('send', 'event', "new version deploy", "accepted");
            deploy.load();
        } else {
          ga('send', 'event', "new version deploy", "refused");
        }
    };

    var sheetnames = [
        'announcements',
        'featuredresources',
    ];

    $scope.ionicUpdate();

    $requestParamArr = [];

    $scope.voiceRecog = function() {
        $scope.voiceFlag = true;
        var maxMatches = 5;
        var promptString = AppConstants.speakNow; // optional
        var language = AppConstants.enUS; // optional

        window.plugins.speechrecognizer.startRecognize(function(result) {
            $scope.query = result[0];
            $scope.$apply();
            if ($scope.voiceFlag && $scope.query) {
                $scope.searchResults();
            }
        }, function(errorMessage) {}, maxMatches, promptString, language);
    }

    $scope.openPromo = function(url) {
        ga('send', 'event', AppConstants.promoBanner, AppConstants.fromDiscoverTab, url);
        window.open(url, AppConstants.system);
    };

    $scope.openURL = function(item) {
        ga('send', 'event', 'External ' + item.type + ' opened', item.os + ': ' + item.title, AppConstants.fromFeaturedResourcesTab);
        ga('send', 'event', 'External ' + item.type, 'opened', item.title);
        window.open(item.url, AppConstants.system);
    };

    $scope.openInformedURL = function() {
        var url = AppConstants.informedURL;
        ga('send', 'event', 'Opened Informed blog site (CableLabs)', url);
        window.open(url, AppConstants.system);
    };

    $scope.openNctaURL = function() {
        var url = AppConstants.nctaURL;
        ga('send', 'event', 'Opened NCTA blog site', url);
        window.open(url, AppConstants.system);
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
            Utils.doHttpRequest(Utils.getApiDetails().getIndividualAPI.httpMethod, 
                                Utils.getApiDetails().BaseURL + Utils.getApiDetails().getIndividualAPI.contexPath, 
                                Utils.getHttpHeader(), $requestParamArr).then(function(response) {
                if (response != null) {
                    $message = response['message'];
                    $data = response['data'];
                    $scope.hideLoader();

                    if ($message['statusCode'] == AppConstants.status401 || $message['statusCode'] == AppConstants.status105) {
                        Utils.autoLogin().then(function(response) {

                            if (response != null) {
                                $message = response['message'];
                                if ($message['statusCode'] == AppConstants.status200) {
                                    ga('send', 'event', "autologin", AppConstants.success);
                                    $rootScope.authToken = $localStorage['authToken'];
                                    $scope.fetchProfile();
                                } else {
                                  ga('send', 'event', "autologin", $message['statusDescription']);
                                }
                            }
                        });
                    } else if ($message['statusCode'] == AppConstants.status200) {
                        $rootScope.profileData = $data[0];
                        $profileData = $data[0];
                        $localStorage['profiledata'] = $profileData;

                        var miniProfile = {};
                        miniProfile.id = $profileData['Id'];
                        miniProfile.memberType = $profileData['MemberType'];
                        miniProfile.status = $profileData['Status'];
                        miniProfile.paidThru = $profileData['PaidThru'];
                        miniProfile.memberStatus = $profileData['MemberStatus'];
                        miniProfile.companyId = $profileData['CompanyId'];
                        miniProfile.companyName = $profileData['CompanyName'];
                        console.info(miniProfile);

                        $localStorage['SSOUrl'] = $profileData['SSOUrl'];
                        $localStorage["myLearning"] = $profileData.LearningPlan;

                        Utils.scteSSO();
                        
                        $scope.displayName = $profileData['FirstName'];
                        $localStorage['displayName'] = $profileData['FirstName'];

                        $scope.cobrandingRecords = $localStorage['staticcontent.cobranding'];
                        $rootScope.logoURL = $scope.getCobrandingURL($profileData['CompanyId']);
                        ga('send', 'event', "New session - GetIndividual", "success", JSON.stringify(miniProfile));
                        ga('send', 'event', "Session info - company", JSON.stringify(miniProfile.companyName), JSON.stringify(miniProfile.companyId));

                        ga(AppConstants.set, AppConstants.userId, $profileData['Id']);
                        $localStorage['games'] = $profileData.Games;
                        $localStorage['searchEntitlements'] = $profileData.SearchEntitlements;
                        $scope.prepareSearchRequestBody();
                    } else {
                        ga('send', 'event', "New session - GetIndividual", "failure", $message['statusDescription']);
                    }
                }
            });
        } else {
            ga('send', 'event', "Offline error", "fetchProfile");
            $scope.displayAlert(AppConstants.noInternet);
        }

    };

    

    $scope.prepareSearchRequestBody = function() {
        var searchEntitlements = $localStorage['searchEntitlements'];
        $rootScope.courses = searchEntitlements.Courses;
        $rootScope.modules = searchEntitlements.Modules;
    }

    $scope.fetchProfile();
    $profileData = $localStorage['profiledata'];
    $eventsData = $localStorage['eventsdata'];

    if ($profileData == null || $eventsData == null) {
        $scope.showLoader();
    } else {
        if ($profileData != null) {
            $scope.displayName = $profileData['FirstName'];
        }
        if ($eventsData != null) {
            $scope.events = $eventsData['liveLearnings'];
        }
    }

    $scope.query = '';

    $scope.redirectDiscover = function() {
        $location.path('tab/discover');
    };


    $scope.searchResults = function(query) {
        $scope.showLoaderSearch();
        if ($scope.voiceFlag && $scope.query) {
            $scope.addSearchHistory($scope.query);
            if ($state.current.name == AppConstants.tabsearchresultName) {
                $state.reload();
            } else {
                $state.go(AppConstants.tabsearchresultName);
            }
        }

        if (event.keyCode == 13 && query != '') {
            $scope.addSearchHistory(query);
            if ($state.current.name == AppConstants.tabsearchresultName) {
                $state.reload();
            } else {
                $state.go(AppConstants.tabsearchresultName);
            }
        }

        if (query.oldSearch) {
            //$scope.hideRecentSearches();
            $scope.addSearchHistory(query.searchText);
            if ($state.current.name == AppConstants.tabsearchresultName) {
                $state.reload();
            } else {
                $state.go(AppConstants.tabsearchresultName);
            }
        }
    };

    $scope.addSearchHistory = function(queryElement) {
        var srhArr = [];

        if ($localStorage["PreviousSearch"] != undefined) {
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
    $ionicModal.fromTemplateUrl(AppConstants.recentSearchesPage, {
        scope: $scope,
        animation: 'slide-in-up '
    }).then(function(modal) {
        $scope.modalRecentSearches = modal;
    });
    $scope.showRecentSearches = function() {
        if ($scope.previousSearches && $scope.query.length == '') {
            $scope.modalRecentSearches.show();
        }
    };
    $scope.hideRecentSearches = function() {
        $scope.modalRecentSearches.hide();
    };
    $scope.showRecentSearchesFromSearchPage = function() {
        $scope.modalRecentSearches.show();
    };
    $scope.searchChange = function() {
        if ($scope.query && $scope.query.length) {
            $scope.modalRecentSearches.hide();
        } else {
            $scope.modalRecentSearches.show();
        }
    };

    $scope.goButton = function() {
        $state.go(AppConstants.tabsearchresultName);
    };

    $scope.fetchIonicDeployInfo = function() {
        var deploy = new Ionic.Deploy();
        deploy.info().then(function(deployInfo) {
            $scope.displayAlert(AppConstants.UUID + deployInfo.deploy_uuid);
        }, function() {}, function() {});

        deploy.getVersions().then(function(versions) {});
    };

    $scope.rssFeedDetailScreen = function() {
        $state.go(AppConstants.tabrssfeedsName);
    };

    $scope.nctaDetailScreen = function() {
        $state.go(AppConstants.tabnctaName);
    };

    $scope.openPage = function(o, str, i) {
        ga('send', 'event', 'External blog link (' + str + ')', 'opened', o.link, i);
        window.open(o.link, AppConstants.system);
    };

    
}];
