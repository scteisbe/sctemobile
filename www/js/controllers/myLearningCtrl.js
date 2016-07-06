var MyLearningCtrl = ['$scope', '$state', '$rootScope', '$http','Utils','$localStorage', function($scope, $state, $rootScope, $http,Utils,$localStorage, $window) {
   
    $scope.staticContent= [];
    $scope.Config = [];
    $scope.platform = ionic.Platform.platform();
    $scope.staticContent['configs'] = $localStorage['staticcontent.configs'];
    $scope.Config = $scope.staticContent['configs'];
    $scope.btnCourseData = $scope.Config[0];
    $scope.btnCourseDataURL = $scope.Config[1];

// Mylearning API call and integration.
    $requestParamArr = [];
    $headerParamArr = [];

    $headerParamArr.push({"authToken":$rootScope.authToken});
    $headerParamArr.push({"authType":"Bearer"});
    $headerParamArr.push({"Content-Type": "application/json"});

    if($localStorage["myLearning"] != null){
        $scope.myLearning = $localStorage["myLearning"];
        var learnObj = $scope.myLearning;
        console.log("JOSN Stringify"+learnObj[0].LearningPlan);
        $scope.inprogressCourses = learnObj[0].LearningPlan["In Progress"];
        
        $scope.completedCourses = learnObj[0].LearningPlan["Completed"];

        $scope.allCourses = learnObj[0].LearningPlan["All Courses"];
    }

    Utils.doHttpRequest(Utils.getApiDetails().myLearningAPI.httpMethod,Utils.getApiDetails().myLearningAPI.URL,$headerParamArr,$requestParamArr).then(function(response) {
        console.log(response);
        //console.log(response['data']);
        if(response != null) {
            //data available from live API
            $message = response['message'];
            data = response['data'];
            console.log("statusCode.." + $message['statusCode']);
            $scope.hideLoader();
                
            if($message['statusCode'] == 200) {
                console.log("authToken.." +  $rootScope.authToken);
                    
                    if( data != null) {
                        $localStorage["myLearning"]=data;
                        $scope.myLearning = data;
                    }   
            } else {
                    // $scope.displayAlert("Wrong username or password !");
                    console.log($message['statusMessage'])
                }
            }
            else{
                //No API access
                $scope.hideLoader();
                //display data from stub
                $localStorage["myLearning"]=$scope.MyLearningStub;
            }
    }); 

    // $scope.inprogressCourses = [{
    //     "courseName": "Network Overview"
    // }, {
    //     "courseName": "Signal Theory"
    // }, {
    //     "courseName": "Health & Safety"
    // }];

    // $scope.completedCourses = [{
    //     "courseName": "Introduction to Structured Cabling"
    // }, {
    //     "courseName": "LAN Hardware"
    // }, {
    //     "courseName": "Installing Structured Cabling"
    // }];

    $scope.redirectDisover = function() {
       Utils.redirectDiscover();
    };

    // $scope.allCourses = [{
    //     "courseName": "Introduction to Structured Cabling"
    // }, {
    //     "courseName": "LAN Hardware"
    // }, {
    //     "courseName": "Installing Structured Cabling"
    // }, {
    //     "courseName": "Network Overview"
    // }, {
    //     "courseName": "Signal Theory"
    // }, {
    //     "courseName": "Health & Safety"
    // }];

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
        $state.go('tab.mylearningmodal', {id: id});
        // $scope.inprogressModules = data;
        $rootScope.modulename = data.Mod;
        $rootScope.inprogressModule = data;

    };

    $http.get('json/mylearning-resources.json').success(function(data) {
        $scope.items = data;
    });

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

    $scope.openURL = function()
    {
        var myURL = encodeURI($scope.btnCourseDataURL.value);
        window.open(myURL, '_system');
    };

    $scope.openModURL = function(url){
        window.open(url, '_system');
    };

    $http.get('json/games-list.json').success(function(data) {
        $scope.gameItems = data;
    });

}];