var SearchResultsCtrl = ['$scope', '$state', '$http', 'ionicDatePicker', '$ionicModal', 'Utils', '$controller', '$localStorage', function($scope, $state, $http, ionicDatePicker, $ionicModal, Utils, $controller, $localStorage) {

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
    };

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

    $scope.search = function() {

        // Below section of the code is for fetch search response from API. 
        // Please comment out the entire marked section, in case you want to read from Stub 

        /*************************************** Read Response from API ****************************/
        $scope.showLoader();
        Utils.doHttpRequest(Utils.getApiDetails().searchEngineAPI.httpMethod, encodeURI(Utils.getApiDetails().searchEngineAPI.URL + Utils.getApiDetails().searchEngineAPI.contexPath + $scope.query), [], []).then(function(response) {
            console.log(response);
            //console.log(response['data']);
            if (response != null) {
                //data available from live API
                $message = response['message'];
                data = response['data'];
                console.log("statusCode.." + $message['statusCode']);
                $scope.hideLoader();

                if ($message['statusCode'] == 200) {
                    console.log("post query for search..");

                    if (data != null) {
                        $scope.items = data;
                        $scope.processResult();
                    }
                } else {
                    console.log($message['statusMessage'])
                }
            } else {
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
        //     if ($scope.items.length == 0) {
        //         $scope.errorMsg = 'No results found!!!';
        //         $scope.hideLoader();
        //     } else {
        //         $scope.processResult();
        //     }

        // });

        /**************************************************************************************************/

    };

    $scope.processResult = function() {


        var contentTypetempSet = new Set();
        var formatTypetempSet = new Set();
        var contentTypetempSettempVariable = {};
        var formatTypetempSettempVariable = {};
        if ($scope.items.length < 11) {
            $scope.readmoreClickFlag = 'true';
        }
        for (var i = 0; i < $scope.items.length; i++) {
            contentTypetempSet.add($scope.items[i].contentType);
            formatTypetempSet.add($scope.items[i].format);
        }

        contentTypetempSet.forEach(function(item) {
            contentTypetempSettempVariable = { text: item, checked: false };
            $scope.contentType.push(contentTypetempSettempVariable);
        }, this);

        formatTypetempSet.forEach(function(item) {
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

    $scope.hideFilterSlider = function() {
        $scope.filterSlider.hide();
    };

    $scope.openUrl = function(url) {
        window.open(url, '_system');
    };

    $scope.getCheckedValues = function(ct, ft) {
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
            $scope.filterMessage = "No results available for the selection!!!"
        }
    };

}];
