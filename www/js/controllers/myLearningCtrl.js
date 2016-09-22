var MyLearningCtrl = ['$scope', '$state', '$rootScope', '$http', 'Utils', '$localStorage', '$window','$ionicScrollDelegate','AppConstants', function($scope, $state, $rootScope, $http, Utils, $localStorage, $window,$ionicScrollDelegate,AppConstants) {

    if($localStorage["myLearning"] != null) {
        Utils.scteSSO();
    }
    $scope.staticContent = [];
    $scope.Config = [];
    $scope.platform = ionic.Platform.platform();
    $scope.staticContent['configs'] = $localStorage['staticcontent.configs'];
    $scope.Config = $scope.staticContent['configs'];
    $scope.btnCourseData = $scope.Config[0];
    $scope.btnCourseDataURL = $scope.Config[1];
    $scope.activeTab = 0; // initially activated secondary tab
    $scope.gameItems = $localStorage['staticcontent.games'];
    $scope.gamesErrorMsg='';
    tempgames=$scope.gameItems;

    //Legacy corse message fetch from the spread sheet.
        
    $scope.Config.forEach(function(element) {
        if(element['key'] == 'course_unavailable_message')
            $scope.courseUnavailableMsg = element['value'];
    }, this);
                        
    if(tempgames ==null || tempgames.length==0){
        $scope.gamesErrorMsg=AppConstants.noData;
    }
    $scope.apiGames = $localStorage['games'];
    $scope.aliases = $localStorage['staticcontent.aliases'];

    function simplifyCourseListing(obj){
      var result = _.map(obj, function(c){
        var res = {};
        res.title=c.ProfileName;
        res.modules=_.map(c.userCourseList, function(m){
          return(m.FullName);
        });
        return(res);
      });
      return (result);
    }

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
        var a = ['/tab/mylearning/all', '/tab/mylearning/inprogress', '/tab/mylearning/completed'];
        $window.ga('send', 'pageview', a[$scope.activeTab]);

        switch ($scope.activeTab) {
            case 0:
                var temp;
                $scope.mylearningCourseLength = $scope.allCoursesLength;
                $scope.noCourseErrorMsg="You haven't enrolled in any courses. Check out all the learning opportunities available to you in the SCTE / ISBE Course Catalog!";
                temp = simplifyCourseListing($scope.allCourses);
                ga('send', 'event', "Course listing JSON - full", "All courses", JSON.stringify(temp).slice(0,6000), temp.length);
                ga('send', 'event', "Course listing JSON - courses only", "All courses", JSON.stringify(_.map(temp, function(o){return(o.title)})).slice(0,6000), temp.length);

                temp = _.filter($scope.allCourses, function(o){return(o.ProfileName == "Legacy Courses");});
                ga('send', 'event', "Visible courses", "All courses", "Legacy", temp.length);

                temp = _.filter($scope.allCourses, function(o){return(o.ProfileName == "Other Courses");});
                ga('send', 'event', "Visible courses", "All courses", "Other", temp.length);

                temp = _.filter($scope.allCourses, function(o){return(o.ProfileName != "Legacy Courses" && o.ProfileName != "Other Courses");});
                ga('send', 'event', "Visible courses", "All courses", "Normal", temp.length);

                break;
            case 1:
                $scope.mylearningCourseLength = $scope.inprogressCoursesLength;
                $scope.noCourseErrorMsg="You don't have any courses in progress. Check out all the learning opportunities available to you in the SCTE / ISBE Course Catalog!";
                temp = simplifyCourseListing($scope.inprogressCourses);
                ga('send', 'event', "Course listing JSON - full", "In progress", JSON.stringify(temp).slice(0,6000), temp.length);
                ga('send', 'event', "Course listing JSON - courses only", "In progress", JSON.stringify(_.map(temp, function(o){return(o.title)})).slice(0,6000), temp.length);

                temp = _.filter($scope.inprogressCourses, function(o){return(o.ProfileName == "Legacy Courses");});
                ga('send', 'event', "Visible courses", "In progress courses", "Legacy", temp.length);

                temp = _.filter($scope.inprogressCourses, function(o){return(o.ProfileName == "Other Courses");});
                ga('send', 'event', "Visible courses", "In progress courses", "Other", temp.length);

                temp = _.filter($scope.inprogressCourses, function(o){return(o.ProfileName != "Legacy Courses" && o.ProfileName != "Other Courses");});
                ga('send', 'event', "Visible courses", "In progress courses", "Normal", temp.length);

                break;
            case 2:
                $scope.mylearningCourseLength = $scope.completedCoursesLength;
                $scope.noCourseErrorMsg="You haven't completed any courses yet.";
                temp = simplifyCourseListing($scope.completedCourses);
                ga('send', 'event', "Course listing JSON - full", "Completed", JSON.stringify(temp).slice(0,6000), temp.length);
                ga('send', 'event', "Course listing JSON - courses only", "Completed", JSON.stringify(_.map(temp, function(o){return(o.title)})).slice(0,6000), temp.length);

                temp = _.filter($scope.completedCourses, function(o){return(o.ProfileName == "Legacy Courses");});
                ga('send', 'event', "Visible courses", "Completed courses", "Legacy", temp.length);

                temp = _.filter($scope.completedCourses, function(o){return(o.ProfileName == "Other Courses");});
                ga('send', 'event', "Visible courses", "Completed courses", "Other", temp.length);

                temp = _.filter($scope.completedCourses, function(o){return(o.ProfileName != "Legacy Courses" && o.ProfileName != "Other Courses");});
                ga('send', 'event', "Visible courses", "Completed courses", "Normal", temp.length);
        }
    });

    $scope.renderMyLearnings = function() {
        
        $scope.myLearning = []
        $scope.inprogressCourses = [];
        $scope.completedCourses = [];
        $scope.allCourses = [];
        $scope.inprogressCoursesLength = 0;
        $scope.completedCoursesLength = 0;
        $scope.allCoursesLength = 0;
            
        if($localStorage["myLearning"] != null) {
            $scope.myLearning = $localStorage["myLearning"];
            $scope.inprogressCourses = $scope.myLearning["In Progress"];
            $scope.completedCourses = $scope.myLearning["Completed"];
            $scope.allCourses = $scope.myLearning["All Courses"];
            
            if($scope.inprogressCourses != null)
                $scope.inprogressCoursesLength = $scope.inprogressCourses.length;
            
            if($scope.completedCourses != null)
                $scope.completedCoursesLength = $scope.completedCourses.length;
            
            if($scope.allCourses != null)
                $scope.allCoursesLength = $scope.allCourses.length;
        } 
       

    };

    $scope.doFocus = function() {
        $ionicScrollDelegate.scrollTop();
    };

    // Mylearning API call and integration.

    if ($localStorage["myLearning"] != null) {
        $scope.renderMyLearnings();
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

    $scope.openSCTEModule = function(url, title) {
         if(url == null || url.length == 0) {
            ga('send', 'event', 'Module', 'unavailable in app', title);
            $scope.displayAlert($scope.courseUnavailableMsg);
        } else {
            ga('send', 'event', 'Module', 'opened', title);
            window.open(url, '_blank', 'location=yes');
        }
    };

    $scope.openLiveLearning = function(url) {
        window.open(url, '_system');
    };
}];
