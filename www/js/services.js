angular.module('scteApp.services', [])

.factory('Utils', function($ionicLoading,$ionicPopup,$http) {
  // Might use a resource here that returns a JSON array

  var Utils = {
    
    
    doHttpRequest : function ($method,$url,$header,requestParamArr) {
       
       return  $http({
			method:$method,
			url:$url,
			//data: {Email:'MAGGIE', password: 'testrecord', grant_type:'password'},
			data: Utils.getStringFromArray(requestParamArr),
			headers: Utils.getJsonFromArray($header) ,
		}).then( 
			function successCallback(response){
				$content = response.data;
                return $content
			},
			
			function errorCallback(response) {
			
				$ionicLoading.hide();
				if(response.data == null) {
					console.log("failed response.." + response.data);
					Utils.displayAlert("Network Error !");
				} else {
					console.log("failed response.." + response.data["message"]);
					Utils.displayAlert("Wrong username or password !");
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
         //console.log(JSON.stringify(object));
         $headerMap = {"Content-Type":"application/x-www-form-urlencoded"};
         angular.forEach(array, function (object) {
            angular.forEach(object, function (value, key) {
                $headerMap[key] = value;
            });
         });
         console.log($headerMap);
         return $headerMap;
     },
     
     displayAlert : function($message) {
        console.log("into displayAlert.." + $message);
        $ionicLoading.hide();
        $ionicPopup.alert({
            title: 'Alert',
            content: $message,
            buttonName: 'OK'
        }).then(function(){});
    },
    
     getBuildType : function() {
         //$buildType = "stub";
         $buildType = "live";
         
         return $buildType;
     }
  };
  return Utils;
});