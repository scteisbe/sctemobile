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

    
    $scope.viewModal = function(id, data) {
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
