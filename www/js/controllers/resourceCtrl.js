var ResourceCtrl = ['$scope', '$state', '$rootScope', '$http', 'Utils', '$localStorage', function($scope, $state, $rootScope, $http, Utils, $localStorage) {

	$scope.standards = $localStorage['staticcontent.standards'];
    //$scope.whitePapers = $localStorage['staticcontent.whitepapers'];
	
    whitePapers = [];
    //if(Utils.getBuildType() == "stub"){
    $scope.dictionarywordsStub=[{Abbreviation : "A", Description : "Ampere", Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "A/D", Description : "Analog to Digital (convertion)" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "A/D/A", Description : "Analog to Digital to Analog" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "AAC", Description : "Advanced Audio Coding" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "AACS", Description : "Advanced Access Content System" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "B", Description : "Ball" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "BA", Description : "B" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "BCC", Description : "Ball" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "C", Description : "Cable" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "CA", Description : "Cable" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "CEO", Description : "Cable" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "D", Description : "Digital" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "D", Description : "Digital" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "DA", Description : "Digital" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "E", Description : "Element" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "ETA", Description : "Element" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        {Abbreviation : "ENR", Description : "Element" , Description2 : "Some long text comes here. test string ignore it.", Category : "Some Text", term: "sample Term"},
        ];
    //} else {
        
     
        $requestParamArr = [];
        $headerParamArr = [];
        
        if($localStorage["dictionarywords"] == null) {
           $scope.showLoader();
        }

// This is for getGlossary.
        $headerParamArr.push({"authToken":$rootScope.authToken});
        $headerParamArr.push({"authType":"Bearer"});
        $headerParamArr.push({"Content-Type": "application/json"});
        Utils.doHttpRequest(Utils.getApiDetails().getGlossaryAPI.httpMethod,Utils.getApiDetails().getGlossaryAPI.URL,$headerParamArr,$requestParamArr).then(function(response) {
            console.log(response);
            //console.log(response['data']);
            if(response != null) {
				//data available from live API
                $message = response['message'];
                data = response['data'];
                console.log("statusCode.." + $message['statusCode']);
                $scope.hideLoader();
                
                if($message['statusCode'] == 200) {
                    //$rootScope.dictionaryData = $data[0];
                    console.log("authToken.." +  $rootScope.dictionaryData);
                    
                    if( data != null) {
                        $localStorage["dictionarywords"]=data;
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
				$localStorage["dictionarywords"]=$scope.dictionarywordsStub;
			}
        });

// This call is for whitepapers. If else is placed here to stop it from calling the API again and again.
// Test to see if data persist.
        if($localStorage["whitePapers"] != ''){
            $scope.whitePapers = $localStorage["whitePapers"];
            //$localStorage["whitePapers"] = '';
        }

        Utils.doHttpRequest(Utils.getApiDetails().whitepaperAPI.httpMethod,Utils.getApiDetails().whitepaperAPI.URL,$headerParamArr,$requestParamArr).then(function(response) {
            console.log(response);
            //console.log(response['data']);
            if(response != null) {
                //data available from live API
                $message = response['message'];
                data = response['data'];
                console.log("statusCode.." + $message['statusCode']);
                $scope.hideLoader();
                
            if($message['statusCode'] == 200) {
                console.log("authToken.." +  $rootScope.dictionaryData);
                    
                    if( data != null) {
                        $localStorage["whitePapers"]=data;
                        $scope.whitePapers = data;
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
                $localStorage["whitePapers"]=$scope.whitePapersStub;
            }
        }); 
   
//}
        /*$scope.events = [{
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
    }];*/

    $scope.dictInfo = "You can search for acronym definitions from the main search. Use the letters below to browse.";
   $scope.scteStandardsSample = [{
        "image": "img/u214.png",
        "scteDocName": "SCTE Standards Docsis 3.0",
        "scteDocInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean",
        "publishedOn": "Published On: 01 May 2016"
    }, {
        "image": "img/u214.png",
        "scteDocName": "SCTE Standards Docsis 2.0",
        "scteDocInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean",
        "publishedOn": "Published On: 01 May 2016"
    }];



    // $scope.alphabetsFirst = [];
    // $scope.alphabetsSecond = [];
    // $scope.alphaFirstInString = "A B C D E F G H I J K L M"
    // $scope.alphaSecondInString = "N O P Q R S T U V W X Y Z"
    // $scope.splitAlpha = function() {
    //     $scope.alphabetsFirst = $scope.alphaFirstInString.split();
    //     $scope.alphabetsSecond = $scope.alphaSecondInString.split();
    // }
    // $scope.splitAlpha();

    $scope.SCTEstd = function() {
        $state.go('tab.resource.scteSTD');
    };

     $scope.whitepaperOpen = function() {
        $state.go('tab.whitepaper');
    };

    //  $http.get('json/alphabets.json').success(function(data) {
    //     $scope.alphabets = data;
    // });

  $scope.alphabets= [{"letter":"A"},{"letter":"B"},{"letter":"C"},{"letter":"D"},{"letter":"E"},{"letter":"F"},{"letter":"G"},{"letter":"H"},{"letter":"I"},{"letter":"J"},{"letter":"K"},{"letter":"L"},{"letter":"M"},{"letter":"N"},{"letter":"O"},{"letter":"P"},{"letter":"Q"},{"letter":"R"},{"letter":"S"},{"letter":"T"},{"letter":"U"},{"letter":"V"},{"letter":"W"},{"letter":"X"},{"letter":"Y"},{"letter":"Z"}];

    $scope.dictionaryview = function(alphabetSelected) {
        $state.go('tab.dictionaryview',{"focusAlpha":alphabetSelected});
    };

    $scope.openStdURL= function(url) {     
        window.open(url, '_system');
    };

	$scope.openURL= function(url) {
        url = "http://"+url;     
		window.open(url, '_system');
	};

    //Below commented piece of code is not requied anymore as 

    // $scope.addEvent= function(startDate,eventYear,eventMonth,startTime,endTime,eventTitle,eventLocation) {
    //     var WPstartDate = new Date(eventYear,eventMonth,startDate,startTime,0,0,0,0); // beware: month 0 = january, 11 = december
    //     var WPendDate = new Date(eventYear,eventMonth,startDate,endTime,0,0,0,0);
    //     var success = function(message) { alert("Success: " + JSON.stringify(message)); };
    //     var error = function(message) { alert("Error: " + message); };
    //     window.plugins.calendar.createEvent(eventTitle,eventLocation,"Event Notes",WPstartDate,WPendDate,success,error);
    // };
    
    $http.get('json/scte-std-docx.json').success(function(data) {
        $scope.scteStandards = data;
    });

    $scope.redirectDisover = function() {
       Utils.redirectDiscover();
       console.log($rootScope.data);
    };

    /*$scope.myEventsList = function() {
        $state.go('tab.resourcesmyevents');
    };*/

    /*$scope.myEvents = [{
        "eventDate" : "19",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle" : "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate":"19-Aug-2016"
    }, {
        "eventDate" : "20",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "20-Aug-2016"
    }, {
        "eventDate" : "21",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "21-Aug-2016"
    }];

    $scope.liveLearning = [{
        "eventDate" : "22",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle" : "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "22-Aug-2016"
    }, {
        "eventDate" : "23",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "23-Aug-2016"
    }, {
        "eventDate" : "24",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "24-Aug-2016"
    }];

    $scope.myChapters = [{
        "eventDate" : "25",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle" : "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "25-Aug-2016"
    }, {
        "eventDate" : "26",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "26-Aug-2016"
    }, {
        "eventDate" : "27",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "27-Aug-2016"
    }];

    $scope.nationwideEvents = [{
        "eventDate" : "28",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle" : "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "28-Aug-2016"
    }, {
        "eventDate" : "29",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "29-Aug-2016"
    }, {
        "eventDate" : "30",
        "eventMonth" : "Aug '16",
        "WPeventYear" : "2016",
        "WPeventMonth" : "7",
        "WPstartTime" : "00",
        "WPendTime" : "24",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day",
        "WPeventDate" : "30-Aug-2016"
    }];*/

}];
