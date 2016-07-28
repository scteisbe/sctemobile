var ResourceCtrl = ['$scope', '$state', '$rootScope', '$http', 'Utils', '$localStorage', function($scope, $state, $rootScope, $http, Utils, $localStorage) {

	$scope.archivedwebinars = $localStorage['staticcontent.archivedwebinars'];

  $scope.archivedwebinars.forEach(function (archivedwebinar) {

    archivedwebinar['url'] = archivedwebinar['url'].replace('http://', '');


}, this);


 $scope.cableLabDocs = $rootScope.scraperData;

  $scope.standards = $localStorage['staticcontent.standards'];
    //$scope.whitePapers = $localStorage['staticcontent.whitepapers'];

        whitePapers = [];
        $requestParamArr = [];
        $headerParamArr = [];
        
        if($localStorage["dictionarywords"] == null) {
         $scope.showLoader();
     }

    $scope.standardsSpecDetail=[];
   $scope.standardsSpecDetail= $scope.standardsSpecDetail.concat($scope.cableLabDocs,$scope.standards);
   //$scope.standardsSpecDetail.concat($scope.standards);
    //alert($scope.standardsSpecDetail.length);

// This is for getGlossary.
$headerParamArr.push({"authToken":$rootScope.authToken});
$headerParamArr.push({"authType":"Bearer"});
$headerParamArr.push({"Content-Type": "application/json"});
if($rootScope.online)
{
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

}
else
{
    $scope.hideLoader();
     $scope.displayAlert("Internet not available. Please check network connectivity.");

}


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


    $scope.SCTEstd = function() {
        $state.go('tab.resource.scteSTD');
    };

    $scope.whitepaperOpen = function() {
        $state.go('tab.whitepaper');
    };

    $scope.archivedwebinarsOpen = function() {
        $state.go('tab.archivedwebinars');
    };
    

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
    
    $http.get('json/scte-std-docx.json').success(function(data) {
        $scope.scteStandards = data;
    });

    $scope.redirectDisover = function() {
     Utils.redirectDiscover();
     console.log($rootScope.data);
 };
}];
