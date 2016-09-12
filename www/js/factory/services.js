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

        var devMode = false;
        if($localStorage["devMode"]) devMode = $localStorage["devMode"];

        var prodBaseURL = "https://api.scte.org/mobileappui/api/";
        var prodSsoUrl = "https://www.scte.org/SCTE/Sign_In.aspx?LoginRedirect=true&returnurl=%2Fmobile%2Fsignin-successful.html";
        var wcwSsoUrl = "http://learning.scte.org";

        if(devMode == 1) {
            prodBaseURL = "https://devapi.scte.org/mobileappui/api/";
            prodSsoUrl = "https://dev.scte.org/SCTE/Sign_In.aspx?LoginRedirect=true&returnurl=%2Fmobile%2Fsignin-successful.html";
            wcwSsoUrl = "http://scte.staging.coursestage.com";
        }
        
        return {
            //"BaseURL":"http://vmdimisapp01:1322/api/",
            
            "BaseURL": prodBaseURL,
            "ssourl": prodSsoUrl,
            "wcwSsoUrl": wcwSsoUrl,
            
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
      // Step 1: get and set an scte.org session cookie
      $http({
        method: 'GET',
        url: Utils.getApiDetails().ssourl
      }).then(function successCallback(response){
        // This trick assumes we get redirected to /mobile/signin-successful.html if already logged in
        if (!response.data.match(/successful signin/i)) {
          // Step 2: POST the scte.org credentials with the fresh session cookie
          $requestParamArr = [];
          $requestParamArr.push({ "__EVENTTARGET": "ctl01$TemplateBody$WebPartManager1$gwpciNewContactSignInCommon$ciNewContactSignInCommon$SubmitButton" });
          $requestParamArr.push({ "__ASYNCPOST": "false" });
          $requestParamArr.push({
            "ctl01$TemplateBody$WebPartManager1$gwpciNewContactSignInCommon$ciNewContactSignInCommon$signInUserName":
            $localStorage['username']
          });
          $requestParamArr.push({
            "ctl01$TemplateBody$WebPartManager1$gwpciNewContactSignInCommon$ciNewContactSignInCommon$signInPassword":
            $localStorage['password']
          });

          $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
          $http.defaults.crossDomain = true;
          
          $http({
            method: 'POST',
            url: Utils.getApiDetails().ssourl,
            data: Utils.getStringFromArray($requestParamArr),
            withCredentials: true,
            headers: '{"cache-control": "no-cache","Content-Type": "application/x-www-form-urlencoded"}' ,
            crossDomain: true,
          })
          .then(function successCallback(response) {
            // if it worked, we should be redirected to /mobile/signin-successful.html
            if (response.data.includes("successful signin")) {
              console.log("Now signed in on scte.org");
              Utils.doWcwSso();
            } else {
              // we got a 20x response status code, but it wasn't the "successful redirect" page
              console.error("Failed to sign in on scte.org");
              console.log(response);
            }
          },
          function errorCallback(response) {
            console.error("Something unexpected happened during scte.org sign in");
            console.log(response);
          });
        } else {
          console.log("Already signed in on scte.org");
          Utils.doWcwSso();
        }
      },function errorCallback(response){
          console.error("Something unexpected happened before scte.org sign in");
          console.log(response);
      })
    },
	
  	doWcwSso : function () {
  		// Step 3: tell WCW to do the SSO dance
      var ssourl = Utils.getApiDetails().wcwSsoUrl;
      // _.each($localStorage["myLearning"]["All Courses"], function(o){
      //   _.each(o.userCourseList, function(i) {
      //     ssourl = ssourl || i.URL;
      //     return (ssourl == '');
      //   });
      //   return (ssourl == '');
      // });

      if (ssourl) {
        $http({
          method: 'GET',
          url: ssourl
        }).then(function successCallback(response){
          // $http is following redirects, so we get 200 on success _and_ when we end up at the scte.org login page
          if (response.data.match(/Sign In/i) || response.data.match(/iMIS-WebPart/i) || response.data.match(/info@scte.org/i)) {
          // these phrases appear on the scte.org login page
          // if the login page changes, this will probably break
            console.error("WCW SSO failed - scte.org is prompting for a password");
            console.log(response);
          } else {
            console.log("WCW SSO successful");
          }
        },function errorCallback(response){
          console.error("Something unexpected happened during WCW SSO");
          console.log(response);
        });
      } else {
        console.log("No WCW SSO URL. Skipping WCW SSO.")
      }
  	}
  };
  return Utils;
}];
