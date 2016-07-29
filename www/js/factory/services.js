var Utils =['$ionicLoading', '$ionicPopup', '$http', '$state', '$q', 'Tabletop', '$localStorage', '$rootScope', function($ionicLoading,$ionicPopup,$http,$state,$q,Tabletop,$localStorage,$rootScope) {

  // Might use a resource here that returns a JSON array

  var Utils = {

    appConstants : function(){

        return 'app constant should reside here';
    },

    getHttpHeader : function(){
        $headerParamArr = [];
        $headerParamArr.push({"authToken":$rootScope.authToken});
        $headerParamArr.push({"authType":"Bearer"});
        $headerParamArr.push({"Content-Type": "application/json"});

        return $headerParamArr;
    },
    
    getApiDetails : function(){
        return {
            "BaseURL":"https://devapi.scte.org",
            "loginAPI" : {
                "URL": "https://devapi.scte.org",
                "httpMethod": "post",
                "contexPath": "/MobileAppUI/api/Token/PostToken"
            },
            "whitepaperAPI":{
                "URL":"https://devapi.scte.org/MobileAppUI/api/Documents/GetDocuments",
                "httpMethod": "get",
                "contexPath" : "/MobileAppUI/api/Documents/GetDocuments"
            },
            "getGlossaryAPI":{
                "URL":"https://devapi.scte.org/MobileAppUI/api/Glossary/GetGlossary",
                "httpMethod": "get",
                "contexPath" : "/MobileAppUI/api/Glossary/GetGlossary"
            },
            "myLearningAPI":{
                "URL":"https://devapi.scte.org/MobileAppUI/api/Individual/GetIndividual",
                "httpMethod": "get",
                "contexPath" : "/MobileAppUI/api/Individual/GetIndividual"
            },
            "getIndividualAPI":{
                "URL":"https://devapi.scte.org/MobileAppUI/api/Individual/GetIndividual",
                "httpMethod": "get",
                "contexPath" : "/MobileAppUI/api/Individual/GetIndividual"
            },
            "searchEngineAPI":{
                "URL":"http://vmdimisapp01:1322/api",
                "httpMethod": "post",
                "contexPath" : "/Search/PostResult?searchText="
            },
            "getCableLabAPI":{
                "URL":"https://devapi.scte.org/mobileappui/api/Scraper/GetResult",
                "httpMethod": "get",
                "contexPath" : "/mobileappui/api/Scraper/GetResult"
            }
        };
    },

    doHttpRequest : function ($method,$url,$header,requestParamArr) {
       
//        console.log("$url................" + $url);
       return  $http({
			method:$method,
			url:$url,
			//data: {Email:'MAGGIE', password: 'testrecord', grant_type:'password'},
			data: Utils.getStringFromArray(requestParamArr),
			headers: Utils.getJsonFromArray($header) ,
		}).then( 
			function successCallback(response){
				$content = response.data;
                
                $message = $content['message'];
//                 console.log("Printing message..");
//                 console.log($message);
                return $content
			},
			
			function errorCallback(response) {
			
				$ionicLoading.hide();
				if(response.data == null) {
					console.log("failed response.." + response.data);
					//Utils.displayAlert("Network Error !");
                    return null;
				} else {
                    console.log(JSON.stringify(response));
					console.log("failed response.." + response.data["message"]);
					//Utils.displayAlert("Wrong username or password !");
                    return null;
				}
			} 
		);
    },
    
    autoLogin : function () {
        
        if($localStorage['username'] == null || $localStorage['password'] == null) return;
        
        $requestParamArr = [];
        $requestParamArr.push({ "UID": $localStorage['username'] });
        $requestParamArr.push({ "password": $localStorage['password'] });
        $requestParamArr.push({ "GrantType": "password" });

	    $headerParamArr = [];
        console.log("in autoLogin ................");           
        return  $http({
			method: 'POST',
			url: 'https://devapi.scte.org/mobileappui/api/Token/PostToken',
			//data: {Email:'MAGGIE', password: 'testrecord', grant_type:'password'},
			data: Utils.getStringFromArray($requestParamArr),
			headers: Utils.getJsonFromArray($headerParamArr) ,
		}).then( 
			function successCallback(response) {
				$content = response.data;
                $data = $content['data'];
                $localStorage['authToken'] = $data['access_token'];
                console.log("in autoLogin completed................");
                return $content
			},
			
			function errorCallback(response) {
			
				$ionicLoading.hide();
				if(response.data == null) {
					console.log("failed response.." + response.data);
					//Utils.displayAlert("Network Error !");
				} else {
					console.log("failed response.." + response.data["message"]);
					//Utils.displayAlert("Wrong username or password !");
				}
			} 
		);
    },
    
    getStringFromArray : function (array) {
        var output = '';
        angular.forEach(array, function (object) {
            angular.forEach(object, function (value, key) {
               output += key + "=" + value +"&";
            });
            
        });
//         console.log("body..");
//         console.log(output);
        return output;
    },
    
     getJsonFromArray : function (array) {
         //console.log(JSON.stringify(object));
         $headerMap = {"Content-Type":"application/x-www-form-urlencoded"};
         angular.forEach(array, function (object) {
            angular.forEach(object, function (value, key) {
                $headerMap[key] = value;
            });
         });
         //
//         console.log("header..");
//         console.log(JSON.stringify($headerMap));
        return $headerMap;
     },
     
     displayAlert : function($message) {
//         console.log("into Service.. displayAlert.." + $message);
        $ionicLoading.hide();
        
        if(navigator != null && navigator.notification != null ) {
        navigator.notification.alert (
            $message,  // message
            Utils.alertDismissed,         // callback
            'Alert',            // title
            'OK'                  // buttonName
        );
        } else {
            $ionicPopup.alert({
                title: 'Alert',
                content: $message,
                buttonName: 'OK'
            }).then(function(){});
        }
    },
    
    alertDismissed : function() {
    // do something
        console.log(" alert dismissed..");
    },
    
    redirectDiscover : function() {
        $state.go('tab.discover');
    },

    getBuildType : function() {
         //$buildType = "stub";
          $buildType = "live"; 
         
         return $buildType;
     },
    
    addEvent : function (startDate, endDate, eventName) {
        var output = '';
// Event logic has to be written.
        return output;
    },

    verifyUser : function (username, password, userCred) {
        var applicationGo = "no";
        
        angular.forEach(userCred, function(storedUser){
            console.log("storedUser..");
            console.log(storedUser);
            if(storedUser.username.toUpperCase() == username.toUpperCase() && storedUser.password == password){
                console.log("username and password matched");
                applicationGo = "yes";
            }
            console.log(JSON.stringify(storedUser));
        });
        return applicationGo;
    },
  
  scteSSO : function () {
        
        console.log("in scteSSO ................");  
        $requestParamArr = [];
	    $requestParamArr.push({ "__EVENTTARGET": "ctl01$TemplateBody$WebPartManager1$gwpciNewContactSignInCommon$ciNewContactSignInCommon$SubmitButton" });
        $requestParamArr.push({ "__ASYNCPOST": "true" });
        $requestParamArr.push({ "ctl01$TemplateBody$WebPartManager1$gwpciNewContactSignInCommon$ciNewContactSignInCommon$signInUserName": $localStorage['username'] });  
        $requestParamArr.push({ "ctl01$TemplateBody$WebPartManager1$gwpciNewContactSignInCommon$ciNewContactSignInCommon$signInPassword": $localStorage['password'] });         
        
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        
        return  $http({
			method: 'POST',
			url: $localStorage['SSOUrl'],
            //url: 'https://dev.scte.org/SCTE/Sign_In.aspx',
			data: Utils.getStringFromArray($requestParamArr),
			headers: '{"cache-control": "no-cache","Content-Type": "application/x-www-form-urlencoded"}' ,
            crossDomain: true,
		}).then( 
			function successCallback(response) {
				console.log("in scteSSO completed................");
                console.log(response);
                // A hack to prevent first time opening issue : Surojit
                Utils.doHttpRequest('GET','http://scte.staging.coursestage.com/mod/scorm/player.php?scoid=938&cm=2495&currentorg=Overview_of_IPv6_and_DOCSIS_3.0_organization&a=367', [], []);
                return response;
			},
			
			function errorCallback(response) {
		        console.log("failed response from scteSSO");
                console.log(response);
			} 
		);
    },
    
  };
  return Utils;
}];