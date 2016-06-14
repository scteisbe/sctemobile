var DiscoverCtrl = ['$scope', '$state', '$rootScope', '$ionicModal','$ionicLoading','Utils','$localstorage', function($scope, $state, $rootScope, $ionicModal, $ionicLoading, Utils, $localstorage) {
    $scope.staticContent = [];
	$scope.platform = ionic.Platform.platform();

  	var sheetnames = [  // every sheet you want access to needs to be listed here
//     'a-sheet-with-errors',   // used for testing
//     'a-sheet-that-does-not-exist',   // used for testing
//     'an-empty-sheet',    // used for testing
    'announcements',
	'featuredresources',
    'apps',
    'featuredcourses',
    'techtips',
    'standards',
    'whitepapers',
    'operationalpractices'
  ];

  $scope.openURL= function(url) {
		window.open(url, '_system');
	};
	
  $scope.withinDates = function(startDate,endDate)
  {
	  var currentDate = new Date();
	  //check if current date is within given dates
	  if (currentDate >= new Date(startDate) && currentDate<= new Date(endDate))
	  {
		  return true;
	  }
	  else
	  {
		  return false;
	  }
	  
  };
  // immediately populate from localstorage
  sheetnames.forEach(function(sheet, i){
	//to be changed - copy only relevant data
    $scope.staticContent[sheet] = $localstorage.getObject('staticcontent.' + sheet);
	console.log(sheet + "..." + JSON.stringify($scope.staticContent[sheet]));
  });
  
  console.log("Loaded static content from local cache.");
    if(Utils.getBuildType() == "stub") {
         $scope.username = "Bradley";
	} else {
        $profileData = $localstorage.getObject('profiledata');
        if($profileData != null) {
            $scope.username = $profileData['FirstName'];
        }
        else {
            $scope.showLoader();
        }
        
        $requestParamArr = [];
        
        $headerParamArr = [];
        $headerParamArr.push({"authToken":$rootScope.authToken});
        $headerParamArr.push({"authType":"Bearer"});
        
        //
        Utils.doHttpRequest('GET','http://vmdimisapp01:1322/api/Individual/GetIndividual',$headerParamArr,$requestParamArr).then(function(response) {
            console.log(response);
            if(response != null) {
                $message = response['message'];
                $data = response['data'];
                console.log("statusCode.." + $message['statusCode']);
                $scope.hideLoader();
                
                if($message['statusCode'] == 200) {
                    //$rootScope.profileData = $data[0];
                    $profileData = $data[0];
                    $localstorage.setObject('profiledata',  $profileData);
                    console.log("FirstName.." +  $profileData['FirstName']);
                    $scope.username = $profileData['FirstName'];    
                } else {
                // $scope.displayAlert("Wrong username or password !");
                console.log($message['statusMessage'])
                }
            }
        });
    }

    $scope.searchResults = function() {
        if(event.keyCode == 13) {
            $state.go("tab.searchresults");
        }
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
    $scope.myEventsList = function() {
        $state.go('tab.discoversmyevents');
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


    $scope.events = [{
        "image": "img/u183.png",
        "date":"18",
        "month":"May '16",
        "eventDate": "Dakota Territory Chapter 13th Vendor Day and Cable-tec Games",
        "eventInfo": "Where:TBD,Sioux Falls, SD"
    }, {
        "image": "img/u183.png",
        "date":"18",
        "month":"May '16",
        "eventDate": "Dakota Territory Chapter 13th Vendor Day and Cable-tec Games",
        "eventInfo": "Where:TBD,Sioux Falls, SD"
    }, {
        "image": "img/u183.png",
        "date":"18",
        "month":"May '16",
        "eventDate": "Dakota Territory Chapter 13th Vendor Day and Cable-tec Games",
        "eventInfo": "Where:TBD,Sioux Falls, SD"
    }];

}];

var SearchResultsCtrl = ['$scope', '$state', '$http', 'ionicDatePicker', '$ionicModal' , function($scope, $state, $http, ionicDatePicker, $ionicModal) {

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
    };

    $scope.sortOptions = [
        { text: "Relevance"},
        { text: "Most Recent"},
        { text: "Content Type"},
        { text: "Format"}
    ];

    $scope.sortOptionChecked = function(option) {
        console.log(option);
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
            var selectedDate = new Date(val);
            var date = selectedDate.getDate();
            var month = selectedDate.getMonth() + 1;
            var year = selectedDate.getFullYear();
            $scope.initialDate="";
            $scope.fromDate = date + "-" + month + "-" + year;
        }
    };

    var ipObj2 = {
        callback: function(val) { //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            var selectedDate = new Date(val);
            var date = selectedDate.getDate();
            var month = selectedDate.getMonth() + 1;
            var year = selectedDate.getFullYear();
            $scope.initialDate="";
            $scope.toDate = date + "-" + month + "-" + year;
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