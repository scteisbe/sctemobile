var MyLearningCtrl = ['$scope', '$state', '$rootScope', '$http', 'Utils', '$localStorage', '$window','$ionicScrollDelegate','AppConstants', function($scope, $state, $rootScope, $http, Utils, $localStorage, $window,$ionicScrollDelegate,AppConstants) {

    Utils.scteSSO();
    $scope.staticContent = [];
    $scope.Config = [];
    $scope.platform = ionic.Platform.platform();
    $scope.staticContent['configs'] = $localStorage['staticcontent.configs'];
    $scope.Config = $scope.staticContent['configs'];
    $scope.btnCourseData = $scope.Config[0];
    $scope.btnCourseDataURL = $scope.Config[1];
    $scope.activeTab = 2; // initially activated secondary tab
    $scope.gameItems = $localStorage['staticcontent.games'];
    $scope.gamesErrorMsg='';
    tempgames=$scope.gameItems;
                        
    if(tempgames ==null || tempgames.length==0){
        $scope.gamesErrorMsg=AppConstants.noData;
    }
    $scope.apiGames = $localStorage['games'];
    $scope.aliases = $localStorage['staticcontent.aliases'];

    $scope.events = $localStorage['eventsdata'];
    $scope.liveLearningsPromos = $localStorage['staticcontent.livelearningpromos'];
    $scope.promoBgImage = '';
    $scope.fetchEvents = function() {
        $scope.liveLearningEvents = $scope.events.liveLearnings[0];
        $scope.liveLearningEvents.title = $scope.liveLearningEvents.title.replace("LiveLearning: ", "");
        var dateFormat = $scope.liveLearningEvents.formattedBeginDate;
        var dateEvent = new Date(dateFormat);
        $scope.liveLearningEvents.formattedBeginDate = dateEvent;
        $scope.promoflag = "false";
        $scope.promoflagType = '';
        for (var i = 0; i < $scope.liveLearningsPromos.length; i++) {

            if ($scope.liveLearningsPromos[i].type == "nooverlay") {
                var currentDate = new Date();
                //check if current date is within given dates
                if (currentDate >= new Date($scope.liveLearningsPromos[i].datestart) && currentDate <= new Date($scope.liveLearningsPromos[i].dateend)) {
                    $scope.promoflag = "true";
                    $scope.promoflagType = "nooverlay";
                    $scope.promoBgImage = $scope.liveLearningsPromos[i].imageurl;
                    break;
                }
            }

        }

        if ($scope.promoflag == "false") {

            for (var i = 0; i < $scope.liveLearningsPromos.length; i++) {

                if ($scope.liveLearningsPromos[i].type == "overlayme") {
                    var currentDate = new Date();
                    //check if current date is within given dates
                    if (currentDate >= new Date($scope.liveLearningsPromos[i].datestart) && currentDate <= new Date($scope.liveLearningsPromos[i].dateend)) {

                        $scope.promoflag = "true";
                        $scope.promoflagType = "overlayme";
                        $scope.promoBgImage = $scope.liveLearningsPromos[i].imageurl;
                        break;
                    }
                }
            }
        }
    };

    $scope.findGameName = function(gamTitle) {
        var i;
        for (i = 0; i < $scope.aliases.length; i++) {
            if ($scope.aliases[i]["insteadofthis"] == gamTitle) {
                break;
            }
        }
        if (i == $scope.aliases.length) {
            $scope.gamDesc = '';
            return gamTitle;
        }
        $scope.gamDesc = $scope.aliases[i]["item1"];
        return $scope.aliases[i]["usethis"];
    };

    $scope.$watch('activeTab', function() {
        var a = ['/tab/mylearning/inprogress', '/tab/mylearning/completed', '/tab/mylearning/all'];
        $window.ga('send', 'pageview', a[$scope.activeTab]);
        switch ($scope.activeTab) {
    case 0:
        $scope.mylearningCourseLength = $scope.inprogressCoursesLength;
        $scope.noCourseErrorMsg="You don't have any courses in progress. Check out all the learning opportunities available to you in the SCTE / ISBE Course Catalog!";
        break;
    case 1:
        $scope.mylearningCourseLength = $scope.completedCoursesLength;
        $scope.noCourseErrorMsg="You haven't completed any courses yet.";
        break;
    case 2:
        $scope.mylearningCourseLength = $scope.allCoursesLength;
        $scope.noCourseErrorMsg="You haven't enrolled in any courses. Check out all the learning opportunities available to you in the SCTE / ISBE Course Catalog!";
       
}
    });

    $scope.renderMyLearnings = function() {
        $scope.myLearning = $localStorage["myLearning"];
        $scope.inprogressCourses = $scope.myLearning["In Progress"];
        $scope.completedCourses = $scope.myLearning["Completed"];
        $scope.allCourses = $scope.myLearning["All Courses"];
        $scope.inprogressCoursesLength = $scope.inprogressCourses.length;
        $scope.completedCoursesLength = $scope.completedCourses.length;
        $scope.allCoursesLength = $scope.allCourses.length;

    };

      $scope.doFocus = function() {
     //    alert("hii");
     //   document.getElementById('focus').focus();
     // // document.documentElement.scrollTop = 0;
     $ionicScrollDelegate.scrollTop();

    };

    // Mylearning API call and integration.

    if ($localStorage["myLearning"] != null) {
        $scope.renderMyLearnings();
    } else {
        $scope.showLoader();
    }

   
    $scope.renderMyLearnings();

    $scope.redirectDisover = function() {
        ga('send', 'event', 'Search button', 'tap', 'from my learning tab');
        Utils.redirectDiscover();
    };

    
    $scope.inprogressModules = [{
        "id": 1,
        "moduleName": "Characteristics of a Network"
    }, {
        "id": 2,
        "moduleName": "Resource sharing"
    }];

    $scope.viewModal = function(id, data) {
        console.log(name);
        // $scope.modulename = name;
        $state.go('tab.mylearningmodal', { id: id });
        // $scope.inprogressModules = data;
        $rootScope.modulename = data.Mod;
        $rootScope.inprogressModule = data;

    };

    $http.get('json/mylearning-resources.json').success(function(data) {
        $scope.items = data;
    });

    $scope.toggleInprogressCourse = function(inprogressCourse) {
        if ($scope.isInprogressCourseShown(inprogressCourse)) {
            $scope.shownInprogressCourse = null;
        } else {
            $scope.shownInprogressCourse = inprogressCourse;
        }
    };

    $scope.chkMyLearning = function(val) {
        var displayCourse = false;
        $scope.displayWcwCourse = false;
        if(val.ComputedModuleList.length == 0 ){
            $scope.displayWcwCourse = true;
            displayCourse = true;
        }
        angular.forEach(val.ComputedModuleList, function(key, value) {
            if (key.Mod == "scorm") {
                displayCourse = true;
            }
        });

        return {
            displayCourse : displayCourse,
            displayWcwCourse : $scope.displayWcwCourse
        };
    };

    $scope.isInprogressCourseShown = function(inprogressCourse) {
        return $scope.shownInprogressCourse === inprogressCourse;
    };

    $scope.toggleCompletedCourse = function(completedCourse) {
        if ($scope.isCompletedCourseShown(completedCourse)) {
            $scope.shownCompletedCourse = null;
        } else {
            $scope.shownCompletedCourse = completedCourse;
        }
    };

    $scope.isCompletedCourseShown = function(completedCourse) {
        return $scope.shownCompletedCourse === completedCourse;
    };

    $scope.toggleAllCourse = function(allCourse) {
        if ($scope.isAllCourseShown(allCourse)) {
            $scope.shownAllCourse = null;
        } else {
            $scope.shownAllCourse = allCourse;
        }
    };

    $scope.isAllCourseShown = function(allCourse) {
        return $scope.shownAllCourse === allCourse;
    };

    $scope.mylearningGames = [{
        "image": "img/SCTE-ISBE_LogoBugs_Black.png",
        "image_title": "TV Lingo Game",
        "image_description": "Lorem ipsum dolo sitamt, consectetur adipiscing elit."
    }, {
        "image": "img/SCTE-ISBE_LogoBugs_Black.png",
        "image_title": "Game 2",
        "image_description": "Lorem ipsum dolo sitamt, consectetur adipiscing elit."
    }, {
        "image": "img/SCTE-ISBE_LogoBugs_Black.png",
        "image_title": "Game 3",
        "image_description": "Lorem ipsum dolo sitamt, consectetur adipiscing elit."
    }, {
        "image": "img/SCTE-ISBE_LogoBugs_Black.png",
        "image_title": "Game 4",
        "image_description": "Lorem ipsum dolo sitamt, consectetur adipiscing elit."
    }, {
        "image": "img/SCTE-ISBE_LogoBugs_Black.png",
        "image_title": "Game 5",
        "image_description": "Lorem ipsum dolo sitamt, consectetur adipiscing elit."
    }];

    $scope.gamesView = function() {
        $state.go('tab.gamesViewModal');
    };

    $scope.openURL = function() {
        var myURL = encodeURI($scope.btnCourseDataURL.value);
        window.open(myURL, '_system');
    };

    $scope.openModURL = function(url) {
        window.open(url, '_system');
    };

    $scope.openSCTEModule = function(url) {
        window.open(url, '_blank', 'location=yes');
    };

    $scope.openLiveLearning = function(url) {

        window.open(url, '_system');
    };
}];
