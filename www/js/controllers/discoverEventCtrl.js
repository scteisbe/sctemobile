var DiscoverEventCtrl = ['$scope', '$rootScope', '$http', '$state', '$filter', '$sce', 'Utils', '$localStorage', function($scope, $rootScope, $http, $state, $filter, $sce, Utils, $localStorage) {



    $scope.fetchEvents = function() {
        if ($rootScope.online) {
            Utils.doHttpRequest('GET', 'https://devapi.scte.org/mobileappui/api/Events/GetEvents', $scope.getRequestHeader(), $requestParamArr).then(function(response) {

                //console.log(response);
                if (response != null) {
                    $message = response['message'];
                    $eventsData = response['data'];
                    console.log("response['message'] : " + response['message']);
                    console.log("response['data'] : " + response['data']);
                    console.log("in fetchEvents()..GetEvents statusCode.." + $message['statusCode']);
                    $scope.hideLoader();

                    if ($message['statusCode'] == 200) {

                        $localStorage['eventsdata'] = $eventsData;
                        $scope.discoverEvents();

                    } else {
                        // $scope.displayAlert("Wrong username or password !");
                        console.log("$message['statusMessage'] " + $message['statusMessage'])
                    }
                }
            });
        } else {
             $scope.displayAlert("Internet not available. Please check network connectivity.");
        }
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
            if ($scope.eventType[j].webDescription != null) {
                $scope.eventType[j].webDescription = $scope.eventType[j].webDescription;
            }
        }
    };

    $scope.discoverEvents = function() {
        $eventsData = $localStorage['eventsdata'];
        $rootScope.eventTabName = 'relevantEvents';
        $rootScope.eventTyperelevantEvents = $eventsData['relevantEvents'];
        $scope.eventType = $rootScope.eventTyperelevantEvents;
        $scope.dateFormatType();
        $scope.eventWebDescription();
    };

    $scope.fetchEvents();

    if ($localStorage['eventsdata'] != null) {
        $scope.discoverEvents();
    } else {
        $scope.showLoader();
    }


    $scope.liveLearningEvents = function() {
        $eventsData = $localStorage['eventsdata'];
        $rootScope.eventTabName = 'liveLearnings';
        $rootScope.eventTypeliveLearnings = $eventsData['liveLearnings'];
        $scope.eventType = $rootScope.eventTypeliveLearnings;
        $scope.dateFormatType();
        $scope.eventWebDescription();
    };



    $scope.nationwideEvents = function() {
        $rootScope.eventTabName = 'nationalEvents';
        $rootScope.eventTypenationalEvents = $eventsData['nationalEvents'];
        $scope.eventType = $rootScope.eventTypenationalEvents;
        $scope.dateFormatType();
        $scope.eventWebDescription();
    };



    $scope.myEventsList = function() {
        $state.go('tab.discoversmyevents');
    };



    $scope.eventDetail = function(id, eventTabName, htmlDescription) {
        $rootScope.eventDetailId = id;
        $rootScope.eventTabName = eventTabName;
        if (htmlDescription != "" && htmlDescription != null) {

            $state.go('tab.eventsdetails');
        }

    };

    $scope.addEvent = function(title, location, notes, startDate, endDate) {
        //var WPstartDate = new Date(eventYear,eventMonth,startDate,startTime,0,0,0,0); // beware: month 0 = january, 11 = december
        var defaultEndDate = new Date(endDate);
        var defaultStartDate = new Date(startDate);
        var starttime = $filter('date')(defaultStartDate, 'HH:mm:ss');
        var endtime = $filter('date')(defaultEndDate, 'HH:mm:ss');
        if (starttime === "00:00:00") {
            defaultStartDate.setHours(08);
            defaultStartDate.setMinutes(00);
            defaultStartDate.setSeconds(00);
        }
        var newstarttime = $filter('date')(defaultStartDate, 'HH:mm:ss');
        var newendtime = $filter('date')(defaultEndDate, 'HH:mm:ss');
        if (starttime === "00:00:00" && endtime === "00:00:00") {
            defaultEndDate.setHours(17);
            defaultEndDate.setMinutes(00);
            defaultEndDate.setSeconds(00);
        } else if (newstarttime >= newendtime || newendtime === "00:00:00") {
            defaultEndDate.setHours(defaultStartDate.getHours() + 1);
        }

        var success = function(message) { Utils.displayAlert("Event added Successfully"); };
        var error = function(message) { Utils.displayAlert("Event Couldnot be added: " + message); };
        var eventFound = function(message) {
            if (message == "") {
                window.plugins.calendar.createEvent(title, location, notes, defaultStartDate, defaultEndDate, success, error);
            } else {
                Utils.displayAlert('Event is already added in your calendar.');
            }
        };
        var errorEvent = function(message) {
            Utils.displayAlert('Error in calendar.');
        };
        window.plugins.calendar.findEvent(title, location, notes, defaultStartDate, defaultEndDate, eventFound, errorEvent);

        //window.plugins.calendar.createEvent(title, location, notes, startDate, endDatee, success, error);
    };

}];


var DiscoverEventsDetailCtrl = ['$scope', '$rootScope', '$state', '$http', '$stateParams', '$filter', 'Utils', function($scope, $rootScope, $state, $http, $stateParams, $filter, Utils) {

    $scope.eventFullDescription = function() {
        if ($rootScope.eventTabName === "liveLearnings") {
            $scope.overallevents = $rootScope.eventTypeliveLearnings;
            console.log("liveLearning Events : " + $scope.overallevents);
        }
        /*if ($rootScope.eventTabName == 'myChapter') {
            $scope.overallevents = $rootScope.eventTypemyChapter;
        }*/

        if ($rootScope.eventTabName === "relevantEvents") {
            $scope.overallevents = $rootScope.eventTyperelevantEvents;
            console.log("relevant Events : " + $scope.overallevents);
            console.log("relevant Events main value: " + $rootScope.eventTyperelevantEvents);
        }
        if ($rootScope.eventTabName === "nationalEvents") {
            $scope.overallevents = $rootScope.eventTypenationalEvents;
            console.log("national Events : " + $scope.overallevents);
        }

        for (var event = 0; event < $scope.overallevents.length; event++) {
            if ($rootScope.eventDetailId == $scope.overallevents[event].eventId) {
                $scope.events = $scope.overallevents[event];
                console.log("full web description : " + $scope.events);
            }
        }
    };

    $scope.addEvent = function(title, location, notes, startDate, endDate) {
        //var WPstartDate = new Date(eventYear,eventMonth,startDate,startTime,0,0,0,0); // beware: month 0 = january, 11 = december
        var defaultEndDate = new Date(endDate);
        var defaultStartDate = new Date(startDate);
        var starttime = $filter('date')(defaultStartDate, 'HH:mm:ss');
        var endtime = $filter('date')(defaultEndDate, 'HH:mm:ss');
        if (starttime === "00:00:00") {
            defaultStartDate.setHours(08);
            defaultStartDate.setMinutes(00);
            defaultStartDate.setSeconds(00);
        }
        var newstarttime = $filter('date')(defaultStartDate, 'HH:mm:ss');
        var newendtime = $filter('date')(defaultEndDate, 'HH:mm:ss');
        if (starttime === "00:00:00" && endtime === "00:00:00") {
            defaultEndDate.setHours(17);
            defaultEndDate.setMinutes(00);
            defaultEndDate.setSeconds(00);
        } else if (newstarttime >= newendtime || newendtime === "00:00:00") {
            defaultEndDate.setHours(defaultStartDate.getHours() + 1);
        }

        var success = function(message) { Utils.displayAlert("Event added Successfully"); };
        var error = function(message) { Utils.displayAlert("Event Couldnot be added: " + message); };
        var eventFound = function(message) {
            if (message == "") {
                window.plugins.calendar.createEvent(title, location, notes, defaultStartDate, defaultEndDate, success, error);
            } else {
                Utils.displayAlert('Event is already added in your calendar.');
            }
        };
        var errorEvent = function(message) {
            Utils.displayAlert('Error in calendar.');
        };
        window.plugins.calendar.findEvent(title, location, notes, defaultStartDate, defaultEndDate, eventFound, errorEvent);

        //window.plugins.calendar.createEvent(title, location, notes, startDate, endDatee, success, error);
    };

}];
