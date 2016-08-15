var Utils =['$ionicLoading', '$ionicPopup', '$http', '$state', '$q', 'Tabletop', '$localStorage', '$rootScope','AppConstants',
 function($ionicLoading,$ionicPopup,$http,$state,$q,Tabletop,$localStorage,$rootScope,AppConstants) {

  // Might use a resource here that returns a JSON array

  var Utils = {

    
    getHttpHeader : function(){
        $headerParamArr = [];
        $headerParamArr.push({"authToken":$rootScope.authToken});
        $headerParamArr.push({"authType":"Bearer"});
        $headerParamArr.push({"Content-Type": "application/json"});

        return $headerParamArr;
    },
    
    getApiDetails : function(){
        return {
            //"BaseURL":"http://vmdimisapp01:1322/api/",
            
            "BaseURL":"https://devapi.scte.org/mobileappui/api/",
            
            "loginAPI" : {
                "httpMethod": "post",
                "contexPath": "/Token/PostToken"
            },
            "whitepaperAPI":{
                "httpMethod": "get",
                "contexPath" : "/Documents/GetDocuments"
            },
            "getGlossaryAPI":{
                "httpMethod": "get",
                "contexPath" : "/Glossary/GetGlossary"
            },
            "myLearningAPI":{
                "httpMethod": "get",
                "contexPath" : "/Individual/GetIndividual"
            },
            "getIndividualAPI":{
                "httpMethod": "get",
                "contexPath" : "/Individual/GetIndividual"
            },
            "searchEngineAPI":{
                "httpMethod": "post",
                "contexPath" : "/Search/PostResult"
            },
            "getCableLabAPI":{
                "httpMethod": "get",
                "contexPath" : "/Scraper/GetResult"
            },
             "eventsAPI":{
                "httpMethod": "get",
                "contexPath" : "/Events/GetEvents"
            },
        };
    },

    doHttpRequest : function ($method,$url,$header,requestParamArr,isJsonPost) {
       var dataObj = null;
       var headerObj = null;
       if(isJsonPost) {
           dataObj = requestParamArr;
           headerObj = {"Content-Type":"application/json"};
       } else {
           dataObj = Utils.getStringFromArray(requestParamArr);
           headerObj = Utils.getJsonFromArray($header);
       }
       return  $http({
			method:$method,
			url:$url,
			//data: {Email:'MAGGIE', password: 'testrecord', grant_type:'password'},
			data: dataObj,
			headers: headerObj,
		}).then( 
			function successCallback(response){
				$content = response.data;
                
                $message = $content['message'];
                return $content
			},
			
			function errorCallback(response) {
			
				$ionicLoading.hide();
				if(response.data == null) {
					//Utils.displayAlert("Network Error !");
                    return null;
				} else {
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
        $requestParamArr.push({ "password": $localStorage['password']});
        $requestParamArr.push({ "GrantType": "password" });

	    $headerParamArr = [];     
        return  $http({
			method: 'POST',
			url: Utils.getApiDetails().BaseURL + Utils.getApiDetails().loginAPI.contexPath,
			data: Utils.getStringFromArray($requestParamArr),
			headers: Utils.getJsonFromArray($headerParamArr) ,
		}).then( 
			function successCallback(response) {
                
                if (response != null) {
                    
                                                         
                    $content = response.data;
                    $data = $content['data'];
                    $message = $content['message'];
                   
                    if ($message['statusCode'] == 200) {
                        $localStorage['authToken'] = $data['access_token'];
                    } else {
                        $state.go('login');
                        Utils.displayAlert(AppConstants.wrongUserNamePassword);
                    }
                    return $content
                }
                
				
			},
			
			function errorCallback(response) {
			
				$ionicLoading.hide();
				if(response.data == null) {
					//Utils.displayAlert("Network Error !");
				} else {
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
        return output;
    },
    
     getJsonFromArray : function (array) {
         $headerMap = {"Content-Type":"application/x-www-form-urlencoded"};
         angular.forEach(array, function (object) {
            angular.forEach(object, function (value, key) {
                $headerMap[key] = value;
            });
         });
        return $headerMap;
     },
     
     displayAlert : function($message) {
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
    },
    
    redirectDiscover : function() {
        $rootScope.initialFocus=true;
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
            if(storedUser.username.toUpperCase() == username.toUpperCase() && storedUser.password == password){
                applicationGo = "yes";
            }
        });
        return applicationGo;
    },
  
  scteSSO : function () {
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
                
                // A hack to prevent first time opening issue : Surojit
                
                if(!$rootScope.ssoCompleted) {
                    $http({
                        method: 'GET',
			            url: 'http://scte.staging.coursestage.com/mod/scorm/player.php?scoid=938&cm=2495&currentorg=Overview_of_IPv6_and_DOCSIS_3.0_organization&a=367', 
                        headers: '{"cache-control": "no-cache","Content-Type": "application/x-www-form-urlencoded"}' ,
                        crossDomain: true,
                    }).then(function(response) {
                        if (response != null) {
                            console.log("SSO response..");
                            console.log(response);
                            $rootScope.ssoCompleted = false;
                            return response;
                        }
                    });
                }
			},
			
			function errorCallback(response) {
			} 
		);
    },
    
  };
  return Utils;
}];