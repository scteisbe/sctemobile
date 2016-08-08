var DiscoverEventCtrl = ['$scope', '$rootScope', '$http', '$state', '$filter', '$sce', 'Utils', '$localStorage', 'AppConstants', function($scope, $rootScope, $http, $state, $filter, $sce, Utils, $localStorage, AppConstants) {
    Utils.scteSSO();
    $scope.eventErrorMsg = '';
    $scope.fetchEvents = function() {
        if ($rootScope.online) {
            Utils.doHttpRequest(AppConstants.GET, AppConstants.eventAPI, $scope.getRequestHeader(), $requestParamArr).then(function(response) {

                if (response != null) {
                    $message = response['message'];
                    $eventsData = response['data'];
                    $scope.hideLoader();

                    if ($message['statusCode'] == AppConstants.status200) {

                        $localStorage['eventsdata'] = $eventsData;
                        $scope.discoverEvents();
                        tempevents = $localStorage['eventsdata'];

                        if (tempevents == null || tempevents.length == 0) {
                            $scope.eventErrorMsg = AppConstants.noData;
                        }

                    }


                }
            });
        } else {
            $scope.displayAlert(AppConstants.discoverNoInternet);
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
        $rootScope.eventTabName = AppConstants.relevantEvents;
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
        $rootScope.eventTabName = AppConstants.liveLearnings;
        $rootScope.eventTypeliveLearnings = $eventsData['liveLearnings'];
        $scope.eventType = $rootScope.eventTypeliveLearnings;
        $scope.dateFormatType();
        $scope.eventWebDescription();
    };



    $scope.nationwideEvents = function() {
        $rootScope.eventTabName = AppConstants.nationalEvents;
        $rootScope.eventTypenationalEvents = $eventsData['nationalEvents'];
        $scope.eventType = $rootScope.eventTypenationalEvents;
        $scope.dateFormatType();
        $scope.eventWebDescription();
    };



    $scope.myEventsList = function() {
        $state.go(AppConstants.tabdiscoversmyEvents);
    };



    $scope.eventDetail = function(id, eventTabName, htmlDescription) {
        $rootScope.eventDetailId = id;
        $rootScope.eventTabName = eventTabName;
        if (htmlDescription != "" && htmlDescription != null) {

            $state.go(AppConstants.tabeventsdetailsName);
        }

    };

    $scope.addEvent = function(title, location, notes, startDate, endDate) {
        event.stopPropagation();
        var defaultEndDate = new Date(endDate);
        var defaultStartDate = new Date(startDate);
        var starttime = $filter('date')(defaultStartDate, AppConstants.datePattern);
        var endtime = $filter('date')(defaultEndDate, AppConstants.datePattern);
        if (starttime === AppConstants.startTime) {
            defaultStartDate.setHours(08);
            defaultStartDate.setMinutes(00);
            defaultStartDate.setSeconds(00);
        }
        var newstarttime = $filter('date')(defaultStartDate, AppConstants.datePattern);
        var newendtime = $filter('date')(defaultEndDate, AppConstants.datePattern);
        if (starttime === AppConstants.startTime && endtime === AppConstants.startTime) {
            defaultEndDate.setHours(17);
            defaultEndDate.setMinutes(00);
            defaultEndDate.setSeconds(00);
        } else if (newstarttime >= newendtime || newendtime === AppConstants.startTime) {
            defaultEndDate.setHours(defaultStartDate.getHours() + 1);
        }

        var success = function(message) { Utils.displayAlert(AppConstants.discoverEventAddSuccess); };
        var error = function(message) { Utils.displayAlert(AppConstants.discoverEventAddFail + message); };
        var eventFound = function(message) {
            if (message == "") {
                window.plugins.calendar.createEvent(title, location, notes, defaultStartDate, defaultEndDate, success, error);
            } else {
                Utils.displayAlert(AppConstants.discoverEventsAlreadyAvailable);
            }
        };
        var errorEvent = function(message) {
            Utils.displayAlert(AppConstants.discoverErrorInCalendar);
        };
        window.plugins.calendar.findEvent(title, location, notes, defaultStartDate, defaultEndDate, eventFound, errorEvent);
    };

    $scope.eventUrl = function(url) {
        if (url.indexOf("http") == -1) {
            if (url.indexOf("www") == -1) {
                url = "http://" + url;
            } else {
                url = "http://www." + url;
            }
        }
        window.open(url, '_system');
    };

}];


var DiscoverEventsDetailCtrl = ['$scope', '$rootScope', '$state', '$http', '$stateParams', '$filter', 'Utils', 'AppConstants', function($scope, $rootScope, $state, $http, $stateParams, $filter, Utils, AppConstants) {

    $scope.eventFullDescription = function() {
        if ($rootScope.eventTabName === AppConstants.liveLearnings) {
            $scope.overallevents = $rootScope.eventTypeliveLearnings;
        }
        if ($rootScope.eventTabName === AppConstants.relevantEvents) {
            $scope.overallevents = $rootScope.eventTyperelevantEvents;
        }
        if ($rootScope.eventTabName === AppConstants.nationalEvents) {
            $scope.overallevents = $rootScope.eventTypenationalEvents;
        }

        for (var event = 0; event < $scope.overallevents.length; event++) {
            if ($rootScope.eventDetailId == $scope.overallevents[event].eventId) {
                $scope.events = $scope.overallevents[event];
            }
        }
    };

    $scope.addEvent = function(title, location, notes, startDate, endDate) {
        var defaultEndDate = new Date(endDate);
        var defaultStartDate = new Date(startDate);
        var starttime = $filter('date')(defaultStartDate, AppConstants.datePattern);
        var endtime = $filter('date')(defaultEndDate, AppConstants.datePattern);
        if (starttime === AppConstants.startTime) {
            defaultStartDate.setHours(08);
            defaultStartDate.setMinutes(00);
            defaultStartDate.setSeconds(00);
        }
        var newstarttime = $filter('date')(defaultStartDate, AppConstants.datePattern);
        var newendtime = $filter('date')(defaultEndDate, AppConstants.datePattern);
        if (starttime === AppConstants.startTime && endtime === AppConstants.startTime) {
            defaultEndDate.setHours(17);
            defaultEndDate.setMinutes(00);
            defaultEndDate.setSeconds(00);
        } else if (newstarttime >= newendtime || newendtime === AppConstants.startTime) {
            defaultEndDate.setHours(defaultStartDate.getHours() + 1);
        }

        var success = function(message) { Utils.displayAlert(AppConstants.discoverEventAddSuccess); };
        var error = function(message) { Utils.displayAlert(AppConstants.discoverEventAddFail + message); };
        var eventFound = function(message) {
            if (message == "") {
                window.plugins.calendar.createEvent(title, location, notes, defaultStartDate, defaultEndDate, success, error);
            } else {
                Utils.displayAlert(AppConstants.discoverEventsAlreadyAvailable);
            }
        };
        var errorEvent = function(message) {
            Utils.displayAlert(AppConstants.discoverErrorInCalendar);
        };
        window.plugins.calendar.findEvent(title, location, notes, defaultStartDate, defaultEndDate, eventFound, errorEvent);
    };

    $scope.eventUrl = function(url) {
        if (url.indexOf("http") == -1) {
            if (url.indexOf("www") == -1) {
                url = "http://" + url;
            } else {
                url = "http://www." + url;
            }
        }
        window.open(url, '_system');
    };

}];
