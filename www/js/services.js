angular.module('scteApp.services', ['times.tabletop'])
.factory('Utils', function($ionicLoading,$ionicPopup,$http,$state,$q,Tabletop,$localStorage) {

  // Might use a resource here that returns a JSON array

  var Utils = {
    
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
            } 
        };
    },

    doHttpRequest : function ($method,$url,$header,requestParamArr) {
       
       console.log("$url................" + $url);
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
                console.log("Printing message..");
                console.log($message);
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
    
    scteSSOAuthenticate : function () {
        
        $requestParamArr = [];
        // $requestParamArr.push({ "UID": $localStorage['username'] });
        // $requestParamArr.push({ "password": $localStorage['password'] });
        // $requestParamArr.push({ "GrantType": "password" });

	    $headerParamArr = [];
        console.log("in autoLogin ................");           
        return  $http({
			method: 'GET',
			url: 'https://www.scte.org/SCTE/Sign_In.aspx',
			//data: {Email:'MAGGIE', password: 'testrecord', grant_type:'password'},
			//data: Utils.getStringFromArray($requestParamArr),
			//headers: Utils.getJsonFromArray($headerParamArr) ,
		}).then( 
			function successCallback(response) {
				$content = response.data;
                
                console.log("in scteSSOAuthenticate completed................");
                //console.log($content);
                
                var parser = new DOMParser();
                var doc = parser.parseFromString($content,"text/html");
                
                doc.getElementById("ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_signInUserName").value = "tester@scte.org";
                doc.getElementById("ctl01_TemplateBody_WebPartManager1_gwpciNewContactSignInCommon_ciNewContactSignInCommon_signInPassword").value = "scte1234";
                console.log( doc.getElementById("aspnetForm"));
                
                var element = doc.getElementById("aspnetForm");
                element.submit();
                Utils.scteSSOTest();
                return $content
			},
			
			function errorCallback(response) {
	            console.log("in scteSSOAuthenticate failure................");
                console.log(response.data);
			} 
		);
    },
    
    scteSSOTest : function () {
        
        $requestParamArr = [];
        // $requestParamArr.push({ "UID": $localStorage['username'] });
        // $requestParamArr.push({ "password": $localStorage['password'] });
        // $requestParamArr.push({ "GrantType": "password" });

	    $headerParamArr = [];
        console.log("in autoLogin ................");           
        return  $http({
			method: 'GET',
			url: 'https://www.scte.org/SCTE/Contact_Management/Contact/AccountPage.aspx',
			//data: {Email:'MAGGIE', password: 'testrecord', grant_type:'password'},
			//data: Utils.getStringFromArray($requestParamArr),
			//headers: Utils.getJsonFromArray($headerParamArr) ,
		}).then( 
			function successCallback(response) {
				$content = response.data;
                
                console.log("in scteSSOTest completed................");
                console.log($content);
                return $content
			},
			
			function errorCallback(response) {
	            console.log("in scteSSOTest failure................");
                console.log(response.data);
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
        console.log("body..");
        console.log(output);
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
        console.log("header..");
        console.log(JSON.stringify($headerMap));
        return $headerMap;
     },
     
     displayAlert : function($message) {
        console.log("into Service.. displayAlert.." + $message);
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
    }
  };

  return Utils;
});