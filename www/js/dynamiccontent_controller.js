(function() {
angular.module('cortex')
.controller('DynamicContentController', ['$scope','$http', '$localstorage', '$ionicLoading','$ionicLoading','$ionicPopup', '_', DynamicContentController])
  function DynamicContentController($scope, $http, $localstorage,$root,$ionicLoading,$ionicPopup) {
    
    $scope.openPage = function(url) {
      window.open(url, '_system');
    };

    $scope.dynamiccontent = [];
    $scope.loginContent = [];
    $scope.authToken = $root.authToken;
    $scope.profileData = $root.profileData;
    
    var dcobjects = [
      { "name": "meetings", "url": "https://raw.githubusercontent.com/scteisbe/sctemobile/master/www/stubs/meetings.json" }
    ];
    
    // immediately populate from localstorage
    _.forEach(dcobjects, function(item, i) {
      console.log("Loading dynamic content from local cache: " + item.name);
      $scope.dynamiccontent[item.name] = $localstorage.getObject('dynamiccontent.' + item.name) || [];

      console.log("Loading dynamic content from " + item.url);
      $http({
        method: 'GET',
        url: item.url
      })
      .then(
        function successCallback(response) {
          try {
              // try to update from feed
              $scope.dynamiccontent[item.name] = response.data;
              if (!$scope.dynamiccontent[item.name].length) {
                throw "No entries assigned to " + item.name + " from " + item.url;
              }
              // store result in localstorage for fast access next time
              $localstorage.setObject('dynamiccontent.' + item.name, $scope.dynamiccontent[item.name]);
              console.log("Loaded dynamic content to " + item.name + " from " + response.config.url);
          } catch (error) {
            console.log("Can't read JSON feed '" + item.url + "'. Using local client cache. " + error);
          }			
        },
        function errorCallback(response) {
// alert("e1: " + JSON.stringify(response));
        }
      );

    });

    
    $scope.doLogin = function() {
      
      console.log("username.." + $scope.email);
      console.log("password.." + $scope.password);
      
       $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
       });
      
       $http({
        method:'POST',
        url:'http://vmdimisapp01:1322/api/Token/PostToken',
        //data: {Email:'MAGGIE', password: 'testrecord', grant_type:'password'},
        data: 'UID=' + $scope.email + '&password=' + $scope.password + '&GrantType=password',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then( 
        function successCallback(response){
            $scope.loginContent = response.data;
            $message = $scope.loginContent['message'];
            $data = $scope.loginContent['data'];
            console.log("statusCode.." + $message['statusCode']);
            
            if($message['statusCode'] == 200) {
              $root.authToken = $data['access_token'];
              console.log("authToken.." +  $root.authToken);
              //$scope.goToHome();
              $scope.fetchProfile();
            } else {
              $scope.displayAlert("Wrong username or password !");
            }
        },
        
        function errorCallback(response) {
           
           $ionicLoading.hide();
           if(response.data == null) {
             console.log("failed response.." + response.data);
            $scope.displayAlert("Network Error !")
           } else {
             console.log("failed response.." + response.data["message"]);
             $scope.displayAlert("Wrong username or password !");
           }
           
           
        }  
          
      );
    }
    
    $scope.fetchProfile = function() {
      
      $http({
        method:'GET',
        url:'http://vmdimisapp01:1322/api/Individual/GetIndividual',
        //data: {Email:'MAGGIE', password: 'testrecord', grant_type:'password'},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authType':'Bearer',
            'authToken': '' + $root.authToken
        },
      }).then( 
        function successCallback(response){
            $scope.profileContent = response.data;
            $message = $scope.profileContent['message'];
            $data = $scope.profileContent['data'];
            $root.profileData = $data[0];
            console.log("Profile .. statusCode.." + $message['statusCode']);  
            console.log("Profile .. First Name ==>" + $root.profileData['FirstName']);
            $scope.goToHome();     
        },
        
        function errorCallback(response) {
           console.log("failed response.." + response.data['message']);
           $ionicLoading.hide();
        }  
      );
    }
    
    $scope.fetchGlossary = function() {
      
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      });
      
      $http({
        method:'GET',
        url:'http://vmdimisapp01:1322/api/Glossary/GetGlossary',
        //data: {Email:'MAGGIE', password: 'testrecord', grant_type:'password'},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authType':'Bearer',
            'authToken': '' + $root.authToken
        },
      }).then( 
        function successCallback(response){
            $ionicLoading.hide();
            $message = response.data['message'];
            $scope.glossaryContent = response.data['data'];
            
            console.log("Glossary .. statusCode.." + $message['statusCode']); 
            $scope.glossaryItems = []; 
            if( $scope.glossaryContent != null) {
              //console.log("Glossary .. Count ==>" + JSON.stringify($scope.glossaryContent));
              for (var i = 0; i < $scope.glossaryContent.length; i++) {
                 //console.log("Abbreviation.." + JSON.stringify(item));
                 $scope.glossaryItems[i] = $scope.glossaryContent[i];
                 
               };
            }
        },
        
        function errorCallback(response) {
           $ionicLoading.hide();
           console.log("failed response.." + response.data['message']);
        }  
      );
    } 
  }
})();
