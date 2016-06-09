var MyLearningCtrl = ['$scope', '$state', '$rootScope', '$http', function($scope, $state, $rootScope, $http) {

    $scope.viewModal = function() {
        $state.go('tab.mylearningmodal');
    };

    $http.get('json/mylearning-resources.json').success(function(data) {
        $scope.items = data;
    });

    $scope.inprogressCourses = [{
        "courseName": "Network Overview"
    }, {
        "courseName": "Signal Theory"
    }, {
        "courseName": "Health & Safety"
    }];

    $scope.completedCourses = [{
        "courseName": "Introduction to Structured Cabling"
    }, {
        "courseName": "LAN Hardware"
    }, {
        "courseName": "Installing Structured Cabling"
    }];

    $scope.allCourses = [{
        "courseName": "Introduction to Structured Cabling"
    }, {
        "courseName": "LAN Hardware"
    }, {
        "courseName": "Installing Structured Cabling"
    }, {
        "courseName": "Network Overview"
    }, {
        "courseName": "Signal Theory"
    }, {
        "courseName": "Health & Safety"
    }];

    $scope.inprogressModules = [{
        "moduleName": "Characteristics of a Network"
    }, {
        "moduleName": "Resource sharing"
    }];

    /*$scope.completedModules = [{
        "moduleName": "Cable media types"
    }, {
        "moduleName": "Network topologies"
    }];*/

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

    $scope.mylearningGames = [{
        "image" : "img/batman_applibrary.jpg",
        "image_title" : "TV Lingo Game",
        "image_description" : "Lorem ipsum dolo sitamt, consectetur adipiscing elit."
    }, {
        "image" : "img/batman_applibrary.jpg",
        "image_title" : "Game 2",
        "image_description" : "Lorem ipsum dolo sitamt, consectetur adipiscing elit."
    }, {
        "image" : "img/batman_applibrary.jpg",
        "image_title" : "Game 3",
        "image_description" : "Lorem ipsum dolo sitamt, consectetur adipiscing elit."
    }, {
        "image" : "img/batman_applibrary.jpg",
        "image_title" : "Game 4",
        "image_description" : "Lorem ipsum dolo sitamt, consectetur adipiscing elit."
    }, {
        "image" : "img/batman_applibrary.jpg",
        "image_title" : "Game 5",
        "image_description" : "Lorem ipsum dolo sitamt, consectetur adipiscing elit."
    }];

    $scope.gamesView = function() {
        $state.go('tab.gamesViewModal');
    };

    $http.get('json/games-list.json').success(function(data) {
        $scope.gameItems = data;
    });

}];