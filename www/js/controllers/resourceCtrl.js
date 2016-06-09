var ResourceCtrl = ['$scope', '$state', '$rootScope', '$http', 'Utils', function($scope, $state, $rootScope, $http, Utils) {

    $rootScope.dictionarywords= [];
    if(Utils.getBuildType() == "stub"){
        $rootScope.dictionarywords=[{word : "A", description : "Ampere"},
        {word : "A/D", description : "Analog to Digital (convertion)"},
        {word : "A/D/A", description : "Analog to Digital to Analog"},
        {word : "AAC", description : "Advanced Audio Coding"},
        {word : "AACS", description : "Advanced Access Content System"},
        {word : "B", description : "Ball"},
        {word : "BA", description : "B"},
        {word : "BCC", description : "Ball"},
        {word : "C", description : "Cable"},
        {word : "CA", description : "Cable"},
        {word : "CEO", description : "Cable"},
        {word : "D", description : "Dog"},
        {word : "D", description : "Digital"},
        {word : "DA", description : "Dog"},
        {word : "E", description : "Elephant"},
        {word : "ETA", description : "Elephant"},
        {word : "ENR", description : "Elephant"},
        ];
    } else {
        $scope.showLoader();
     
        $requestParamArr = [];
        $headerParamArr = [];
        
        $headerParamArr.push({"authToken":$rootScope.authToken});
        $headerParamArr.push({"authType":"Bearer"});
        Utils.doHttpRequest('GET','http://vmdimisapp01:1322/api/Glossary/GetGlossary',$headerParamArr,$requestParamArr).then(function(response) {
            console.log(response);
            //console.log(response['data']);
            if(response != null) {
                $message = response['message'];
                data = response['data'];
                console.log("statusCode.." + $message['statusCode']);
                $scope.hideLoader();
                
                if($message['statusCode'] == 200) {
                    //$rootScope.dictionaryData = $data[0];
                    console.log("authToken.." +  $rootScope.dictionaryData);
                    
                    if( data != null) {
                        //console.log("Glossary .. Count ==>" + JSON.stringify($scope.glossaryContent));
                        
                        angular.forEach(data, function (object) {
                            
                            dictObject = {word : "" + object["Abbreviation"] , description : "" + object["Description"], 
                                                    definition : "" + object["Description2"] , category : "" + object["Category"]};
                            //console.log("dictObject.." + JSON.stringify(dictObject));
                            $rootScope.dictionarywords.push(dictObject);
                        });
                                    
                        //console.log("dictionarywords..." + $scope.dictionarywords.length);
                    }   
                } else {
                    // $scope.displayAlert("Wrong username or password !");
                    console.log($message['statusMessage'])
                }
            }
        });
    }
    
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



    $scope.alphabetsFirst = [];
    $scope.alphabetsSecond = [];
    $scope.alphaFirstInString = "A B C D E F G H I J K L M"
    $scope.alphaSecondInString = "N O P Q R S T U V W X Y Z"
    $scope.splitAlpha = function() {
        $scope.alphabetsFirst = $scope.alphaFirstInString.split();
        $scope.alphabetsSecond = $scope.alphaSecondInString.split();
    }
    $scope.splitAlpha();

    $scope.SCTEstd = function() {
        $state.go('tab.scteSTD');
    };

     $http.get('json/alphabets.json').success(function(data) {
        $scope.alphabets = data;
    });

    $scope.dictionaryview = function(alphabetSelected) {
        $state.go('tab.dictionaryview',{focusAlpha:alphabetSelected});
    };

    $http.get('json/scte-std-docx.json').success(function(data) {
        $scope.scteStandards = data;
    });

    $scope.myEventsList = function() {
        $state.go('tab.resourcesmyevents');
    };

    $scope.myEvents = [{
        "eventDate" : "19",
        "eventMonth" : "May '16",
        "eventTitle" : "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }, {
        "eventDate" : "20",
        "eventMonth" : "May '16",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }, {
        "eventDate" : "21",
        "eventMonth" : "May '16",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }];

    $scope.liveLearning = [{
        "eventDate" : "22",
        "eventMonth" : "May '16",
        "eventTitle" : "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }, {
        "eventDate" : "23",
        "eventMonth" : "May '16",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }, {
        "eventDate" : "24",
        "eventMonth" : "May '16",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }];

    $scope.myChapters = [{
        "eventDate" : "25",
        "eventMonth" : "May '16",
        "eventTitle" : "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }, {
        "eventDate" : "26",
        "eventMonth" : "May '16",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }, {
        "eventDate" : "27",
        "eventMonth" : "May '16",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }];

    $scope.nationwideEvents = [{
        "eventDate" : "28",
        "eventMonth" : "May '16",
        "eventTitle" : "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }, {
        "eventDate" : "29",
        "eventMonth" : "May '16",
        "eventTitle": "East Pennsylvania Chapter Training",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }, {
        "eventDate" : "30",
        "eventMonth" : "May '16",
        "eventTitle": "Northeast Commtech Show & Seminars",
        "eventLocation" : "SCTE Exton, PA",
        "eventTime" : "All Day"
    }];

}];
