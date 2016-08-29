var ResourceCtrl = ['$scope', '$state', '$rootScope', '$http', 'Utils', '$localStorage', 'AppConstants', function($scope, $state, $rootScope, $http, Utils, $localStorage, AppConstants) {

    $scope.archivedwebinars = $localStorage['staticcontent.archivedwebinars'];

    $scope.archivedwebinars.forEach(function(archivedwebinar) {

        archivedwebinar['url'] = archivedwebinar['url'].replace('http://', '');


    }, this);


    $scope.dateFormatType = function() {
        for (i = 0; i < $scope.cableLabDocs.length; i++) {
            var dateFormat = $scope.cableLabDocs[i].publishedDate;
            var publishDate = new Date(dateFormat);
            $scope.cableLabDocs[i].publishedDate = publishDate;
        }
    };

    $scope.cableLabDocs = $rootScope.scraperData;
    $scope.dateFormatType();

    $scope.orderByFunction = function() {
        for (var i = 0; i < $scope.standards.length; i++) {
            var strToInt = $scope.standards[i].sortid;
            var parsedInt = parseInt(strToInt);
        }
    };

    $scope.standards = $localStorage['staticcontent.standards'];
    $scope.orderByFunction();


    whitePapers = [];
    $requestParamArr = [];
    $headerParamArr = [];

    $scope.whitePapers = $localStorage["whitePapers"];
    $scope.whitePapersErrorMsg = '';
    if ($localStorage["whitePapers"] == null || $localStorage["whitePapers"].length == 0) {
        $scope.whitePapersErrorMsg = AppConstants.noData;
    }

    $scope.standardsSpecDetail = [];
    $scope.standardsSpecDetail = $scope.standardsSpecDetail.concat($scope.cableLabDocs, $scope.standards);


    $scope.dictInfo = AppConstants.dictionarySearchAcronym;
    $scope.scteStandardsSample = [{
        "image": "img/u214.png",
        "scteDocName": "SCTE Standards Docsis 3.0",
        "scteDocInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean",
        "publishedOn": "Published On: 01 May 2016"
    }, {
        "image": "img/u214.png",
        "scteDocName": "SCTE Standards Docsis 2.0",
        "scteDocInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean",
        "publishedOn": "Published On: 01 May 2016"
    }];

    if ($localStorage["whitePapers"] == undefined || $localStorage["whitePapers"] == null || $localStorage["whitePapers"].length == 0) {
        if ($rootScope.online) {
            $scope.showLoader();
            Utils.doHttpRequest(Utils.getApiDetails().whitepaperAPI.httpMethod, 
            Utils.getApiDetails().BaseURL + Utils.getApiDetails().whitepaperAPI.contexPath, 
            Utils.getHttpHeader(), []).then(function(response) {
                if (response != null) {
                    //data available from live API
                    $message = response['message'];
                    data = response['data'];
                    $scope.hideLoader();
                    if ($message['statusCode'] == 200) {
                        if (data != null) {
                            $localStorage["whitePapers"] = data;
                            $scope.whitePapers = data;
                            $scope.whitePapersErrorMsg = '';
                        }
                    }
                } else {
                    //No API access
                    $scope.hideLoader();
                }
            });
        } else {
            $scope.hideLoader();
            $scope.displayAlert(AppConstants.noInternet);
        }
    }

    if ($localStorage["dictionarywords"] == undefined || $localStorage["dictionarywords"].length == 0) {
        if ($rootScope.online) {
            $scope.showLoader();
            Utils.doHttpRequest(Utils.getApiDetails().getGlossaryAPI.httpMethod, 
            Utils.getApiDetails().BaseURL + Utils.getApiDetails().getGlossaryAPI.contexPath,
            Utils.getHttpHeader(), []).then(function(response) {
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
                    //$localStorage["dictionarywords"] = $scope.dictionarywordsStub;
                }
            });
        } else {
            $scope.hideLoader();
            $scope.displayAlert(AppConstants.noInternet);
        }
    }

    $scope.SCTEstd = function() {
        $state.go('tab.resource.scteSTD');
    };

    $scope.whitepaperOpen = function() {
        $state.go('tab.whitepaper');
    };

    $scope.archivedwebinarsOpen = function() {
        $state.go('tab.archivedwebinars');
    };

    $scope.alphabets = [{ "letter": "A" }, { "letter": "B" }, { "letter": "C" }, { "letter": "D" }, { "letter": "E" }, { "letter": "F" }, { "letter": "G" }, { "letter": "H" }, { "letter": "I" }, { "letter": "J" }, { "letter": "K" }, { "letter": "L" }, { "letter": "M" }, { "letter": "N" }, { "letter": "O" }, { "letter": "P" }, { "letter": "Q" }, { "letter": "R" }, { "letter": "S" }, { "letter": "T" }, { "letter": "U" }, { "letter": "V" }, { "letter": "W" }, { "letter": "X" }, { "letter": "Y" }, { "letter": "Z" }];

    $scope.dictionaryview = function(alphabetSelected) {
        $state.go('tab.dictionaryview', { "focusAlpha": alphabetSelected });
    };

    $scope.openStdURL = function(url) {
        if (url.indexOf("https") != -1) {
            if (url.indexOf("www") == -1) {
                url = url.replace('https://', 'https://www.');
            }
        } else if (url.indexOf("http") != -1) {
            if (url.indexOf("www") == -1) {
                url = url.replace('http://', 'http://www.');
            }
        } else if (url.indexOf("http") == -1) {
            if (url.indexOf("www") != -1) {
                url = "http://" + url;
            } else if (url.indexOf("www") == -1) {
                url = "http://www." + url;
            }
        }
        window.open(url, '_system');
    };

    $scope.openCableSpecUrl = function(url) {
        if (url.indexOf("https") != -1) {
            if (url.indexOf("www") == -1) {
                url = url.replace('https://', 'https://www.');
            }
        } else if (url.indexOf("http") != -1) {
            if (url.indexOf("www") == -1) {
                url = url.replace('http://', 'http://www.');
            }
        } else if (url.indexOf("http") == -1) {
            if (url.indexOf("www") != -1) {
                url = "http://" + url;
            } else if (url.indexOf("www") == -1) {
                url = "http://www." + url;
            }
        }
        window.open(url, '_system');
    };

    $scope.openURL = function(url) {
        url = "http://" + url;
        window.open(url, '_system');
    };

    $http.get('json/scte-std-docx.json').success(function(data) {
        $scope.scteStandards = data;
    });

    $scope.redirectDisover = function() {
        Utils.redirectDiscover();
    };
}];
