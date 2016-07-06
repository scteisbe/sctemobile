var DiscoverCtrl = ['$scope', '$state', '$rootScope', '$ionicModal', '$ionicLoading', 'Utils', '$localStorage', '$sce', function($scope, $state, $rootScope, $ionicModal, $ionicLoading, Utils, $localStorage, $sce) {
    $scope.staticContent = [];
    $scope.platform = ionic.Platform.platform();
    $scope.username = $localStorage['username'];

    var sheetnames = [
        'announcements',
        'featuredresources',
    ];

    $requestParamArr = [];
   /* $scope.voiceRecog = function() {
        
        var recognition = new SpeechRecognition();
        recognition.onresult = function(event) {
            if (event.results.length > 0) {
                $scope.recognizedText = event.results[0][0].transcript;
                alert($scope.recognizedText);
                $scope.query = $scope.recognizedText;
                $scope.$apply();
            }
        };
        recognition.start();
        //alert("step4");

    };*/
   // $scope.recognition = new speechRecognitionAndroid();
    $scope.voiceRecog = function() {
        //alert("audio input new plugin");
        var recognition=$scope.recognition;
        recognition.onresult = function(event) {
            $ionicLoading.hide();
            if (event.results.length > 0) {
                $scope.recognizedText = event.results[0][0].transcript;
                Utils.displayAlert($scope.recognizedText);
               
                $scope.query = $scope.recognizedText;
                $scope.$apply();
            }
        };
        recognition.onreadyForSpeech = function(event){
            console.log("ready for speech");
            $ionicLoading.show({
                   template: "<h2>Please speak</h2><div><button class='button button-clear' ng-click='stopSpeech()'>Stop Sync</button></div>",
                   content: 'Loading',
                   animation: 'fade-in',
                   showBackdrop: true,
                   maxWidth: 300,
                   showDelay: 0,
                   scope: $scope
               });

 
        };
        recognition.onerror = function(event) {
            $ionicLoading.hide();
            console.log("error");
        };
        recognition.onpartialResults = function(event){
            console.log("partial speech" + event.results[0][0].transcript);
            $scope.query = event.results[0][0].transcript;
            $scope.$apply();
        };
        recognition.start();        
    };
    $scope.stopSpeech = function()
    {
        console.log("inside stopSpeechReco");
        $scope.recognition.stop();
        console.log("stopped");
        $ionicLoading.hide();
        $ionicLoading.show({
                   template: '<div>Processing</div><div>....</div>',
                   content: 'Loading',
                   animation: 'fade-in',
                   showBackdrop: true,
                   maxWidth: 300,
                   showDelay: 0,
                   scope:$scope
               });
    };



    $scope.getRequestHeader = function() {
        $headerParamArr = [];
        $headerParamArr.push({ "authToken": $rootScope.authToken });
        $headerParamArr.push({ "authType": "Bearer" });
        return $headerParamArr;
    }

    $scope.openURL = function(url) {
        window.open(url, '_system');
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
                    $localStorage['eventsdata'] = $eventsData;

                    $scope.myEvents = $eventsData['relevantEvents'];
                    $scope.liveLearning = $eventsData['liveLearnings'];
                    $scope.nationwideEvents = $eventsData['nationalEvents'];

                } else {
                    // $scope.displayAlert("Wrong username or password !");
                    console.log($message['statusMessage'])
                }
            }
        });
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
                    console.log("in fetchProfile()..FirstName.." + $profileData['FirstName']);
                    $scope.username = $profileData['FirstName'];
                    $scope.fetchEvents();
                }
            }
        });
    };


    console.log("user name stored is :--" + $localStorage['username']);

    console.log("Loaded static content from local cache.");
    if (Utils.getBuildType() == "stub") {
        $scope.username = "Bradley";

        $scope.events = [{
            "image": "img/u183.png",
            "date": "18",
            "month": "May '16",
            "eventDate": "Dakota Territory Chapter 13th Vendor Day and Cable-tec Games",
            "eventInfo": "Where:TBD,Sioux Falls, SD"
        }, {
            "image": "img/u183.png",
            "date": "18",
            "month": "May '16",
            "eventDate": "Dakota Territory Chapter 13th Vendor Day and Cable-tec Games",
            "eventInfo": "Where:TBD,Sioux Falls, SD"
        }, {
            "image": "img/u183.png",
            "date": "18",
            "month": "May '16",
            "eventDate": "Dakota Territory Chapter 13th Vendor Day and Cable-tec Games",
            "eventInfo": "Where:TBD,Sioux Falls, SD"
        }];
    } else {
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
    }


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

    /*$scope.myEvents = [{
        "eventDate": "19",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "19-Aug-2016"
    }, {
        "eventDate": "20",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "20-Aug-2016"
    }, {
        "eventDate": "21",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "21-Aug-2016"
    }];

    $scope.liveLearning = [{
        "eventDate": "22",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "22-Aug-2016"
    }, {
        "eventDate": "23",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "23-Aug-2016"
    }, {
        "eventDate": "24",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "24-Aug-2016"
    }];

    $scope.myChapters = [{
        "eventDate": "25",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "25-Aug-2016"
    }, {
        "eventDate": "26",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "26-Aug-2016"
    }, {
        "eventDate": "27",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "27-Aug-2016"
    }];

    $scope.nationwideEvents = [{
        "eventDate": "28",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "28-Aug-2016"
    }, {
        "eventDate": "29",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "29-Aug-2016"
    }, {
        "eventDate": "30",
        "eventMonth": "Aug '16",
        "WPeventYear": "2016",
        "WPeventMonth": "7",
        "WPstartTime": "00",
        "WPendTime": "24",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation": "SCTE Exton, PA",
        "eventTime": "All Day",
        "WPeventDate": "30-Aug-2016"
    }];*/



}];

var DiscoverEventCtrl = ['$scope', '$rootScope', '$http', '$state', '$filter', '$sce','Utils', function($scope, $rootScope, $http, $state, $filter, $sce, Utils) {

    $scope.discoverEvents = function() {
        $http.get('json/event_response.json').success(function(res) {
            $scope.eventTabName = 'relevantEvents';
            $rootScope.eventTyperelevantEvents = res.data.relevantEvents;
            $scope.eventType = $rootScope.eventTyperelevantEvents;
            $scope.dateFormatType();
            $scope.eventWebDescription();
        });
    };

    $scope.liveLearningEvents = function() {
        $http.get('json/event_response.json').success(function(res) {
            $scope.eventTabName = 'liveLearnings';
            $rootScope.eventTypeliveLearnings = res.data.liveLearnings;
            $scope.eventType = $rootScope.eventTypeliveLearnings;
            $scope.dateFormatType();
            $scope.eventWebDescription();
        });
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
        $http.get('json/event_response.json').success(function(res) {
            $scope.eventTabName = 'nationalEvents';
            $rootScope.eventTypenationalEvents = res.data.nationalEvents;
            $scope.eventType = $rootScope.eventTypenationalEvents;
            $scope.dateFormatType();
            $scope.eventWebDescription();
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
            $scope.eventType[j].webDescription = $sce.trustAsHtml($scope.eventType[j].webDescription);
            //$scope.eventType[j].webDescription = webDescription;
        }
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
