var SearchResultsCtrl = ['$scope', '$state', '$http', 'ionicDatePicker', '$ionicModal', 'Utils', '$controller',
    '$localStorage', 'AppConstants', '$ionicPopup', '$rootScope',
    function($scope, $state, $http, ionicDatePicker, $ionicModal, Utils, $controller, $localStorage,
        AppConstants, $ionicPopup, $rootScope) {

        var SearchResultsCtrlModel = $scope.$new(); //You need to supply a scope while instantiating.
        //Provide the scope, you can also do $scope.$new(true) in order to create an isolated scope.
        //In this case it is the child scope of this scope.
        $controller('DiscoverCtrl', { $scope: SearchResultsCtrlModel });

        //SearchResultsCtrlModel.recognition; //And call the method on the newScope
        $scope.voiceRecog = function() {
            SearchResultsCtrlModel.voiceRecog(); //And call the method on the newScope 
        };

        $scope.clearSearchField = function() {
            $scope.query = '';
        };

        $scope.searchResults = function(query) {
            SearchResultsCtrlModel.searchResults(query);
            SearchResultsCtrlModel.hideRecentSearches();
        };

        $scope.showRecentSearches = function() {
            if ($scope.query.length == '') {
                SearchResultsCtrlModel.showRecentSearchesFromSearchPage();
            }
        };

        $scope.hideRecentSearches = function() {
            SearchResultsCtrlModel.hideRecentSearches();
        };

        $scope.searchChange = function() {
            // SearchResultsCtrlModel.searchChange();
            if ($scope.query && $scope.query.length) {
                SearchResultsCtrlModel.hideRecentSearches();
            } else {
                SearchResultsCtrlModel.showRecentSearches();
            }
        };

        $scope.redirectDiscover = function() {
            $location.path('tab/discover');
        };

        var config = $localStorage['staticcontent.configs'];
        config.forEach(function(element) {
            if (element['key'] == 'not_entitled_message')
                $scope.noAccessMsg = element['value'];
        }, this);

        $scope.query = $localStorage['PreviousSearch'][0];

        $scope.readmoreClickFlag = 'false';
        $scope.filterReadmoreClickFlag = 'false';
        $scope.items = [];
        $scope.contentType = [];
        $scope.formatType = [];

        $scope.limit = 10;
        $scope.filteredLimit = 10;
        $scope.filteredItems = [];
        $scope.filterFlag = "false";
        $scope.errorMsg = '';
        $scope.isAndroid = ionic.Platform.isAndroid();
        $scope.search = function() {

            // Below section of the code is for fetch search response from API. 
            // Please comment out the entire marked section, in case you want to read from Stub 

            /*************************************** Read Response from API ****************************/
            $scope.showLoaderSearch();
            var searchBody = { "searchText": $scope.query, "courses": $rootScope.courses, "modules": $rootScope.modules };
            //Utils.doHttpRequest(Utils.getApiDetails().searchEngineAPI.httpMethod, encodeURI(Utils.getApiDetails().searchEngineAPI.URL + Utils.getApiDetails().searchEngineAPI.contexPath + $scope.query), [], []).then(function(response) {
            Utils.doHttpRequest(Utils.getApiDetails().searchEngineAPI.httpMethod,
                encodeURI(Utils.getApiDetails().BaseURL + Utils.getApiDetails().searchEngineAPI.contexPath), [],
                searchBody, true).then(function(response) {
                if (response != null) {
                    //data available from live API
                    $message = response['message'];
                    data = response['data'];
                    //$scope.hideLoader();

                    if ($message['statusCode'] == 200) {
                        if (data != null) {
                            $scope.items = data;
                            if ($scope.items.length == 0) {
                                $scope.errorMsg = AppConstants.searchErrorMsg;
                                $scope.hideLoader();
                            } else {
                                $scope.processResult();
                            }
                        }
                    } else {
                        if ($scope.items.length == 0) {
                            $scope.errorMsg = AppConstants.searchErrorMsg;
                            $scope.hideLoader();
                        }
                        $scope.displayAlert(AppConstants.searchServerErrorMsg);
                        $scope.errorMsg = AppConstants.searchErrorMsg;

                    }
                } else {
                    if ($scope.items.length == 0) {
                        $scope.errorMsg = AppConstants.searchErrorMsg;
                        //$scope.hideLoader();
                    }
                    //No API access
                    $scope.hideLoader();
                }
            });

            /**************************************************************************************************/



            // Below section of the code is for fetch search response from Stub JSON. 
            // Please comment out the entire marked section, in case you want to read from API 

            /*************************************** Read Response from Stub JSON ****************************/

            // $http.get('json/sample-search-results.json').success(function(res) {
            //     $scope.items = res.data;
            //     $scope.itemss = res;
            //     $scope.errorMsg = '';
            //     if ($scope.items.length == 0) {
            //         $scope.errorMsg = AppConstants.searchErrorMsg;
            //         $scope.hideLoader();
            //     } else {
            //         $scope.processResult();
            //     }

            // });

            /**************************************************************************************************/
        };

        $scope.trimURL = function(url) {
            var parser = document.createElement('a');
            parser.href = url;
            if(url.length <= 30) return parser.hostname;
            else {  
                if(parser.pathname.length > 1) {       
                    var pathArr =  parser.pathname.split("/");
                    return parser.hostname + "/.../" + pathArr[pathArr.length-1];
                }
                else
                    return parser.hostname; 
            }
        }

        $scope.processResult = function() {

            // var newResults = [];

            // $scope.items.forEach(function(item) {
            //     if(item.hasAccess == 'True') {
            //         newResults.push(item);
            //     }
            // }, this);

            // $scope.items = newResults;

            var newArr = [],
                origLen = $scope.items.length,
                found, x, y;

            for (x = 0; x < origLen; x++) {
                found = undefined;
                for (y = 0; y < newArr.length; y++) {
                    if ($scope.items[x].contentType === newArr[y]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    newArr.push($scope.items[x].contentType);
                }
            }


            var newArr1 = [],
                origLen1 = $scope.items.length,
                found1, x1, y1;

            for (x1 = 0; x1 < origLen1; x1++) {
                found1 = undefined;
                for (y1 = 0; y1 < newArr1.length; y1++) {
                    if ($scope.items[x1].format === newArr1[y1]) {
                        found1 = true;
                        break;
                    }
                }
                if (!found1) {
                    newArr1.push($scope.items[x1].format);
                }
            }

                
            newArr.forEach(function(item) {      
                contentTypetempSettempVariable = { text: item, checked: false };      
                $scope.contentType.push(contentTypetempSettempVariable);    
            }, this);

            newArr1.forEach(function(item) {      
                formatTypetempSettempVariable = { text: item, checked: false };      
                $scope.formatType.push(formatTypetempSettempVariable);    
            }, this);
            $scope.hideLoader();
        }

        // sort slider
        $ionicModal.fromTemplateUrl('templates/discover/sort-slider.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.sortSlider = modal;
        });
        $scope.showSortSlider = function() {
            $scope.sortSlider.show();
        };
        $scope.hideSortSlider = function() {
            $scope.sortSlider.hide();
        };

        // filter slider
        $ionicModal.fromTemplateUrl('templates/discover/filter-slider.html', {
            scope: $scope,
            animation: 'slide-in-right '
        }).then(function(modal) {
            $scope.filterSlider = modal;
        });
        $scope.showFilterSlider = function() {
            $scope.filterSlider.show();
        };


        $scope.readMore = function(type) {
            if (type == "items") {
                $scope.readmoreClickFlag = 'true';
                $scope.limit = $scope.items.length;

            }

            if (type == "filteredItems") {
                $scope.filterReadmoreClickFlag = 'true';
                $scope.filteredLimit = $scope.filteredItems.length;
            }
        };

        $scope.hideFilterSliderOnCancel = function() {
            $scope.formatType.forEach(function(key, idx) {

                key.checked = $scope.formatTypeAfterApply[idx];

            });

            $scope.contentType.forEach(function(key, idx) {

                key.checked = $scope.contentTypeAfterApply[idx];

            });




            //$scope.formatType=$scope.formatTypeAfterApply;
            $scope.filterSlider.hide();
        };

        $scope.hideFilterSlider = function() {
            $scope.filterSlider.hide();
        };

        $scope.openUrl = function(item) {
            if (item.hasAccess.toLowerCase() == 'true') {
                if (item.url.indexOf('inkling.com') != -1) {
                    $scope.openInkLing();
                } else {
                    window.open(item.url, '_system');
                }
            } else {
                //$scope.displayAlert("No Access");
            }
        };

        $scope.openInkLing = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: AppConstants.inkLingtitle,
                template: AppConstants.inkLingMessage
            });

            confirmPopup.then(function(res) {
                if (res) {
                    if (ionic.Platform.platform() == 'android') {
                        window.open(AppConstants.googlePlayStoreLink, '_system');
                    } else {
                        window.open(AppConstants.appleAppStoreLink, '_system');
                    }
                }
            });
        };

        $scope.contentTypeAfterApply = [];
        $scope.formatTypeAfterApply = [];

        $scope.getCheckedValues = function(ct, ft) {
            $scope.contentTypeAfterApply = [];
            $scope.formatTypeAfterApply = [];
            ft.forEach(function(key, idx) {
                if (key.checked) {
                    $scope.formatTypeAfterApply.push(true);
                } else {
                    $scope.formatTypeAfterApply.push(false);
                }
            });

            ct.forEach(function(key, idx) {
                if (key.checked) {
                    $scope.contentTypeAfterApply.push(true);
                } else {
                    $scope.contentTypeAfterApply.push(false);
                }
            });
            $scope.onlyCT = false;
            $scope.onlyFT = false;
            $scope.bothCTFT = false;
            $scope.filterMessage = '';
            $scope.filteredLimit = 10;
            $scope.filterReadmoreClickFlag = 'false';
            for (var j = 0; j < ct.length; j++) {
                if ($scope.onlyCT) {
                    break;
                }
                if (ct[j].checked) {
                    $scope.onlyCT = true;
                }
            }

            for (var j = 0; j < ft.length; j++) {
                if ($scope.onlyFT) {
                    break;
                }
                if (ft[j].checked) {
                    $scope.onlyFT = true;
                }
            }

            if ($scope.onlyCT && $scope.onlyFT) {
                $scope.bothCTFT = true;
            }

            $scope.filteredItems = [];

            if ((!($scope.onlyCT)) && (!($scope.onlyFT)) && (!($scope.bothCTFT))) {
                $scope.filterFlag = "false";
            }

            if ($scope.onlyCT && !($scope.onlyFT)) {
                for (var j = 0; j < ct.length; j++) {
                    if (ct[j].checked) {
                        $scope.filterFlag = "true";
                        for (var i = 0; i < $scope.items.length; i++) {
                            if (ct[j].text == $scope.items[i].contentType) {
                                $scope.filteredItems.push($scope.items[i]);
                            }
                        }
                    }
                }
            }

            if ($scope.onlyFT && !($scope.onlyCT)) {
                for (var k = 0; k < ft.length; k++) {
                    if (ft[k].checked) {
                        $scope.filterFlag = "true";
                        for (var i = 0; i < $scope.items.length; i++) {
                            if (ft[k].text == $scope.items[i].format) {
                                $scope.filteredItems.push($scope.items[i]);
                            }
                        }
                    }
                }
            }


            if ($scope.onlyCT && $scope.onlyFT) {
                for (var j = 0; j < ct.length; j++) {
                    if (ct[j].checked) {
                        for (var k = 0; k < ft.length; k++) {
                            if (ft[k].checked) {
                                $scope.filterFlag = "true";
                                for (var i = 0; i < $scope.items.length; i++) {
                                    if (ct[j].text == $scope.items[i].contentType && ft[k].text == $scope.items[i].format) {
                                        $scope.filteredItems.push($scope.items[i]);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if ($scope.filteredItems.length < 11) {
                $scope.filterReadmoreClickFlag = 'true';
            }

            if ($scope.filteredItems.length == 0 && $scope.filterFlag == "true") {
                // $scope.filterReadMoreFlag = "true";
                $scope.filterMessage = AppConstants.searchFilterMessage;
            }
        };

    }
];
