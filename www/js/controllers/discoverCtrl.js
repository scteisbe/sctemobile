var DiscoverCtrl = ['$scope', '$state', '$rootScope', '$ionicModal', '$ionicLoading', 'Utils', '$localStorage', '$sce', '$window', function($scope, $state, $rootScope, $ionicModal, $ionicLoading, Utils, $localStorage, $sce, $window) {
    $scope.staticContent = [];
    $scope.platform = ionic.Platform.platform();
    $scope.username = $localStorage['username'];
    
	
	$scope.recognitionStopped =false;
	
    var sheetnames = [
        'announcements',
        'featuredresources',
    ];

    $requestParamArr = [];
	
	$scope.voiceRecog = function() {
		var maxMatches = 5;
		var promptString = "Please Speak now"; // optional
		var language = "en-US";                     // optional
		window.plugins.speechrecognizer.startRecognize(function(result){
			console.log("voiceRecog...received result..");
            console.log(result);
            $scope.query = result[0];
            $scope.$apply();
		}, function(errorMessage){
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

    $scope.getCobrandingURL = function(compId){
        for(var i = 0; i<$scope.cobrandingRecords.length; i++){
            if($scope.cobrandingRecords[i].companyid==compId){
                return $scope.cobrandingRecords[i].logourl;
            }
        }
    };

    $scope.fetchProfile = function() {
        Utils.doHttpRequest('GET', 'https://devapi.scte.org/mobileappui/api/Individual/GetIndividual', $scope.getRequestHeader(), $requestParamArr).then(function(response) {
            console.log("in fetchProfile()..Got response in GetIndividual..");
            //console.log(response);
            if (response != null) {
                $message = response['message'];
                $data = response['data'];
                console.log("in fetchProfile() statusCode.." + $message['statusCode']);
                $scope.hideLoader();

                if ($message['statusCode'] == 401) {
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
                    //$rootScope.profileData = $data[0];
                    $profileData = $data[0];
                    $localStorage['profiledata'] = $profileData;
                    $localStorage['SSOUrl'] = $profileData['SSOUrl'];
                    $localStorage["myLearning"]= $profileData.LearningPlan;
                    console.log("in fetchProfile()..SSOUrl.." + $localStorage['SSOUrl']);
                    console.log("in fetchProfile()..FirstName.." + $profileData['FirstName']);
                    $scope.username = $profileData['FirstName'];
                    $scope.cobrandingRecords = $localStorage['staticcontent.cobranding'];
                    $scope.logoURL = $scope.getCobrandingURL($profileData['CompanyId']);  
                    console.log("Logo URL is here : "+$scope.logoURL);                  
                    $window.ga('set', 'userId', $profileData['Id']);
                    Utils.scteSSO();
                }
            }
        });
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
    $scope.fetchProfile();

    $scope.query='';
    $scope.searchResults = function(query) {
        if (event.keyCode == 13 && query != '') {
            $state.go("tab.searchresults");
        }
    };

    $scope.clearSearchField = function() {
        $scope.query = '';
    };

    // Recent search modal
    $ionicModal.fromTemplateUrl('templates/discover/recentsearches.html', {
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
}];

var DiscoverEventCtrl = ['$scope', '$rootScope', '$http', '$state', '$filter', '$sce','Utils','$localStorage', function($scope, $rootScope, $http, $state, $filter, $sce, Utils,$localStorage) {

    $scope.fetchEvents = function() {
        Utils.doHttpRequest('GET', 'https://devapi.scte.org/mobileappui/api/Events/GetEvents', $scope.getRequestHeader(), $requestParamArr).then(function(response) {

            //console.log(response);
            if (response != null) {
                $message = response['message'];
                $eventsData = response['data'];
                console.log("in fetchEvents()..GetEvents statusCode.." + $message['statusCode']);
                $scope.hideLoader();

                if ($message['statusCode'] == 200) {
                    console.log("Printing events data..");
                    console.log($eventsData);
                    if($localStorage['eventsdata'] != null) {
                        $localStorage['eventsdata'] = $eventsData;
                        $scope.discoverEvents();
                    } else {
                        $localStorage['eventsdata'] = $eventsData;
                    }
                } else {
                    // $scope.displayAlert("Wrong username or password !");
                    console.log($message['statusMessage'])
                }
            }
        });
    };
     $scope.dateFormatType = function() {
        for (i = 0; i < $scope.eventType.length; i++) {
            var dateFormat = $scope.eventType[i].formattedBeginDate;
            var dateEvent = new Date(dateFormat);
            $scope.eventType[i].formattedBeginDate = dateEvent;
        }
    };

    $scope.eventWebDescription = function() {
        for (j = 0; j < $scope.eventType.length; j++) {
            if($scope.eventType[j].webDescription != null) {
                //console.log("webDescription.....................");
                //console.log(JSON.stringify($scope.eventType[j].webDescription));
                $scope.eventType[j].webDescription = $sce.trustAsHtml("" + $scope.eventType[j].webDescription);
                //$scope.eventType[j].webDescription = webDescription;
            }
        }
    };
    
    $scope.discoverEvents = function() {
            $eventsData = $localStorage['eventsdata'];    
            $scope.eventTabName = 'relevantEvents';
            $rootScope.eventTyperelevantEvents = $eventsData['relevantEvents'];
            $scope.eventType = $rootScope.eventTyperelevantEvents;
            $scope.dateFormatType();
            $scope.eventWebDescription();     
    };
    
    $scope.fetchEvents();
    
    if($localStorage['eventsdata'] != null) {
        $scope.discoverEvents();
    } else {
        $scope.showLoader();
    }
    

    $scope.liveLearningEvents = function() {
        $eventsData = $localStorage['eventsdata'];
        $scope.eventTabName = 'liveLearnings';
        $rootScope.eventTypeliveLearnings = $eventsData['liveLearnings'];
        $scope.eventType = $rootScope.eventTypeliveLearnings;
        $scope.dateFormatType();
        $scope.eventWebDescription();
    };

    /*$scope.myChapter = function() {
        $http.get('json/event_response.json').success(function(res) {
            $scope.eventTabName = 'myChapter';
            $rootScope.eventTypemyChapter = res.data.myChapter;
            $scope.eventType = $rootScope.eventTypemyChapter;
            $scope.dateFormatType();
        });
    };*/

    $scope.nationwideEvents = function() {
        $scope.eventTabName = 'nationalEvents';
        $rootScope.eventTypenationalEvents = $eventsData['nationalEvents'];
        $scope.eventType = $rootScope.eventTypenationalEvents;
        $scope.dateFormatType();
        $scope.eventWebDescription();
    };

   

    $scope.myEventsList = function() {
        $state.go('tab.discoversmyevents');
    };

    /*$scope.eventInDetail = function() {
        $state.go('tab.eventsdetails');
    };*/

    $scope.eventDetail = function(id, eventTabName, htmlDescription) {
        $rootScope.eventDetailId = id;
        $rootScope.eventTabName = eventTabName;
        if (htmlDescription != "" && htmlDescription != null) {
            
            $state.go('tab.eventsdetails');
        }

    };

    $scope.addEvent = function(title, location, notes, startDate, endDate) {
        //var WPstartDate = new Date(eventYear,eventMonth,startDate,startTime,0,0,0,0); // beware: month 0 = january, 11 = december
        var endDatee = new Date(endDate);

        /*var addEventPopup = $ionicPopup.confirm({
            title: 'Add Event to Calendar',
            template: 'Do you want to add the event to your calendar?'
        });
        addEventPopup.then(function(res) {
            if (res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });*/

        var success = function(message) { Utils.displayAlert("Event added Successfully"); };
        var error = function(message) { Utils.displayAlert("Event Couldnot be added: " + message); };
        var eventFound = function(message) {
            if (message == "") {
                window.plugins.calendar.createEvent(title, location, notes, startDate, endDatee, success, error);
            } else {
                Utils.displayAlert('Event is already added in your calendar.');
            }
        };
        var errorEvent = function(message) {
            Utils.displayAlert('Error in calendar.');
        };
        window.plugins.calendar.findEvent(title, location, notes, startDate, endDatee, eventFound, errorEvent);

        //window.plugins.calendar.createEvent(title, location, notes, startDate, endDatee, success, error);
    };

    $scope.openPage = function(url) {
        window.open("http://" + url, '_system');
        console.log("meeting url: " + url);
    };

}];

var SearchResultsCtrl = ['$scope', '$state', '$http', 'ionicDatePicker', '$ionicModal', 'Utils','$controller', function($scope, $state, $http, ionicDatePicker, $ionicModal, Utils, $controller) {

var SearchResultsCtrlModel = $scope.$new(); //You need to supply a scope while instantiating.
   //Provide the scope, you can also do $scope.$new(true) in order to create an isolated scope.
   //In this case it is the child scope of this scope.
   $controller('DiscoverCtrl',{$scope : SearchResultsCtrlModel });
   
   
   //SearchResultsCtrlModel.recognition; //And call the method on the newScope
   $scope.voiceRecog= function() {
       SearchResultsCtrlModel.voiceRecog(); //And call the method on the newScope 
    };


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
    
    $scope.hideFilterSlider = function() {
        $scope.fromDate = $scope.initialDate;
        $scope.toDate = $scope.initialDate;
        $scope.filterSlider.hide();

        //angular.element('.popup').css('display','none');
    };

     $scope.hideFilterSliderCancel = function() {
        $scope.fromDate = $scope.initialDate;
        $scope.toDate = $scope.initialDate;
        $scope.contentType = [
        { text: "Learning", checked: false },
        { text: "Pocket Guide", checked: false },
        { text: "Tech Tips", checked: false },
        { text: "Web Content", checked: false },
        { text: "Standards", checked: false }
    ];

    $scope.formatType = [
        { text: "Video", checked: false },
        { text: "PDF", checked: false },
        { text: "Online Content", checked: false }
    ];
    $scope.unCheck=false;
    $scope.publishedPeriod = [
        { text: "Last 1 week", checked: false },
        { text: "Last 2 weeks", checked: false },
        { text: "Last 3 weeks", checked: false }
    ];
        $scope.filterSlider.hide();

        //angular.element('.popup').css('display','none');
    };

    $scope.sortOptions = [
        { text: "Relevance" },
        { text: "Most Recent" },
        { text: "Content Type" },
        { text: "Format" }
    ];

    $scope.sortOptionChecked = function(option) {
        console.log(option);
        $scope.searchResultsText = "SORTED BY " + option;
        $scope.sortSlider.hide();
    };

    $scope.contentType = [
        { text: "Learning", checked: false },
        { text: "Pocket Guide", checked: false },
        { text: "Tech Tips", checked: false },
        { text: "Web Content", checked: false },
        { text: "Standards", checked: false }
    ];

    $scope.formatType = [
        { text: "Video", checked: false },
        { text: "PDF", checked: false },
        { text: "Online Content", checked: false }
    ];

    $scope.publishedPeriod = [
        { text: "Last 1 week", checked: false },
        { text: "Last 2 weeks", checked: false },
        { text: "Last 3 weeks", checked: false }
    ];

    var ipObj1 = {
        callback: function(val) { //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            $scope.firstDate = val;

            if ($scope.secondDate < val) {
                Utils.displayAlert("select valid date");
            } else {
                var selectedDate = new Date(val);
                var date = selectedDate.getDate();
                var month = selectedDate.getMonth() + 1;
                var year = selectedDate.getFullYear();
                $scope.initialDate = "";
                $scope.fromDate = date + "-" + month + "-" + year;
            }

            
        }
    };

    var ipObj2 = {
        callback: function(val) { 
            $scope.secondDate = val;
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            if ($scope.firstDate > val) {
                Utils.displayAlert("select valid date");
            } else {
                var selectedDate = new Date(val);
                var date = selectedDate.getDate();
                var month = selectedDate.getMonth() + 1;
                var year = selectedDate.getFullYear();
                $scope.initialDate = "";
                $scope.toDate = date + "-" + month + "-" + year;
            }
        }
    };

    $scope.openDatePickerFrom = function() {
        ionicDatePicker.openDatePicker(ipObj1);

    };

    $scope.openDatePickerTo = function() {
        ionicDatePicker.openDatePicker(ipObj2);
    };

    $http.get('json/search-results.json').success(function(data) {
        $scope.items = data;
    });

    $scope.searchResultsText = "SEARCH RESULTS";

    $scope.limit = 2;


}];

var DiscoverEventsCtrl = ['$scope', '$rootScope', '$state', '$http', '$stateParams','Utils', function($scope, $rootScope, $state, $http, $stateParams, Utils) {
    $scope.overallevents = '';
    $scope.events = '';

    $scope.eventFullDescription = function() {
        if ($rootScope.eventTabName == 'liveLearnings') {
            $scope.overallevents = $rootScope.eventTypeliveLearnings;
        }
        if ($rootScope.eventTabName == 'myChapter') {
            $scope.overallevents = $rootScope.eventTypemyChapter;
        }

        if ($rootScope.eventTabName == 'relevantEvents') {
            $scope.overallevents = $rootScope.eventTyperelevantEvents;
        }
        if ($rootScope.eventTabName == 'nationalEvents') {
            $scope.overallevents = $rootScope.eventTypenationalEvents;
        }

        for (var event = 0; event < $scope.overallevents.length; event++) {
            if ($rootScope.eventDetailId == $scope.overallevents[event].eventId) {
                $scope.events = $scope.overallevents[event];
            }
        }
    };
    $scope.addEvent = function(title, location, notes, startDate, endDate) {
        //var WPstartDate = new Date(eventYear,eventMonth,startDate,startTime,0,0,0,0); // beware: month 0 = january, 11 = december
        var endDatee = new Date(endDate);

        /*var addEventPopup = $ionicPopup.confirm({
            title: 'Add Event to Calendar',
            template: 'Do you want to add the event to your calendar?'
        });
        addEventPopup.then(function(res) {
            if (res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });*/

        var success = function(message) { Utils.displayAlert("Event added Successfully"); };
        var error = function(message) { Utils.displayAlert("Event Couldnot be added: " + message); };
        var eventFound = function(message) {
            if (message == "") {
                window.plugins.calendar.createEvent(title, location, notes, startDate, endDatee, success, error);
            } else {
                Utils.displayAlert('Event is already added in your calendar.');
            }
        };
        var errorEvent = function(message) {
            Utils.displayAlert('Error in calendar.');
        };
        window.plugins.calendar.findEvent(title, location, notes, startDate, endDatee, eventFound, errorEvent);

        //window.plugins.calendar.createEvent(title, location, notes, startDate, endDatee, success, error);
    }

}];
