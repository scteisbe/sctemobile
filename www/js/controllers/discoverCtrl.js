var DiscoverCtrl = ['$scope', '$state', '$rootScope', '$ionicModal','$ionicLoading','Utils', function($scope, $state, $rootScope, $ionicModal, $ionicLoading, Utils) {
    
    if(Utils.getBuildType() == "stub") {
         $scope.username = "VivinAnto";
    } else {
        $requestParamArr = [];
        
        $headerParamArr = [];
        $headerParamArr.push({"authToken":$rootScope.authToken});
        $headerParamArr.push({"authType":"Bearer"});
        
        $scope.showLoader();
        Utils.doHttpRequest('GET','http://vmdimisapp01:1322/api/Individual/GetIndividual',$headerParamArr,$requestParamArr).then(function(response) {
            console.log(response);
            if(response != null) {
                $message = response['message'];
                $data = response['data'];
                console.log("statusCode.." + $message['statusCode']);
                $scope.hideLoader();
                
                if($message['statusCode'] == 200) {
                    $rootScope.profileData = $data[0];
                    console.log("FirstName.." +  $rootScope.profileData['FirstName']);
                    $scope.username = $rootScope.profileData['FirstName'];    
                } else {
                // $scope.displayAlert("Wrong username or password !");
                console.log($message['statusMessage'])
                }
            }
        });
    }
    
   
    $scope.viewProfile = function() {
        $state.go('tab.myprofile');
        console.log('HI');
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

    $scope.previousSearches = [{
        "date": "<Date Searched>",
        "keyword": "Keywords Searched",
        "noOfResults": "12 Results Returned"
    }, {
        "date": "<Date Searched>",
        "keyword": "Keywords Searched",
        "noOfResults": "12 Results Returned"
    }, {
        "date": "<Date Searched>",
        "keyword": "Keywords Searched",
        "noOfResults": "12 Results Returned"
    }];

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

}];

var SearchResultsCtrl = ['$scope', '$state', '$rootScope', '$http', 'ionicDatePicker', function($scope, $state, $rootScope, $http, ionicDatePicker) {

    $rootScope.contentType = [
        { text: "Learning", checked: false },
        { text: "Pocket Guide", checked: false },
        { text: "Tech Tips", checked: false },
        { text: "Web Content", checked: false },
        { text: "Standards", checked: false }
    ];

    $rootScope.formatType = [
        { text: "Video", checked: false },
        { text: "PDF", checked: false },
        { text: "Online Content", checked: false }
    ];

    $rootScope.publishedPeriod = [
        { text: "Last 1 week", checked: false },
        { text: "Last 2 weeks", checked: false },
        { text: "Last 3 weeks", checked: false }
    ];

    var ipObj1 = {
        callback: function(val) { //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            var selectedDate = new Date(val);
            var date = selectedDate.getDate();
            var month = selectedDate.getMonth() + 1;
            var year = selectedDate.getFullYear();
            $rootScope.selectedDate = date + "-" + month + "-" + year;
        },
        disabledDates: [ //Optional
            new Date(2016, 2, 16),
            new Date(2015, 3, 16),
            new Date(2015, 4, 16),
            new Date(2015, 5, 16),
            new Date('Wednesday, August 12, 2015'),
            new Date("08-16-2016"),
            new Date(1439676000000)
        ],
        from: new Date(2012, 1, 1), //Optional
        to: new Date(2016, 10, 30), //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        disableWeekdays: [0], //Optional
        closeOnSelect: false, //Optional
        templateType: 'popup' //Optional
    };

    $rootScope.openDatePicker = function() {
        ionicDatePicker.openDatePicker(ipObj1);
    };

    $rootScope.openDatePickerTo = function() {
        ionicDatePicker.openDatePicker(ipObj1);
    };

    $http.get('json/search-results.json').success(function(data) {
        $scope.items = data;
    });

    $scope.limit = 2;

}];

var DiscoverEventsCtrl = function($scope) {

  $scope.items = [
    {
      "date": "Monday May 2 2016",
      "title": "A National Event",
      "description": "This is the description",
    },{
      "date": "Monday May 2 2016",
      "title": "A National Event",
      "description": "This is the description",
    },{
      "date": "Monday May 2 2016",
      "title": "A National Event",
      "description": "This is the description",
    },{
      "date": "Monday May 2 2016",
      "title": "A National Event",
      "description": "This is the description",
    },{
      "date": "Monday May 2 2016",
      "title": "A National Event",
      "description": "This is the description",
    },{
      "date": "Monday May 2 2016",
      "title": "A National Event",
      "description": "This is the description",
    },{
      "date": "Monday May 2 2016",
      "title": "A National Event",
      "description": "This is the description",
    },{
      "date": "Monday May 2 2016",
      "title": "A National Event",
      "description": "This is the description",
    }
  ];

};