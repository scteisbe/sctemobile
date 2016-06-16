var  loginCtrl =  ['$scope', '$state', '$rootScope','$http','$ionicLoading','$ionicPopup','$localStorage','Utils', '$q','StaticService','$timeout', '$window','$localstorage',
			function($scope,$state,$rootScope,$http,$ionicLoading,$ionicPopup,$localStorage, Utils, $q, StaticService, $timeout, $window, $localstorage) {

	// Just for developmet, need to remove before production release
	$scope.userCred = [{
		"username" : "maggie",
		"password" : "testrecord"
	},
	{
		"username" : "testUser1",
		"password" : "testrecord"
	},
	{
		"username" : "testUser2",
		"password" : "testrecord"
	}];
	// $scope.username = 'maggie';
	// $scope.password = 'testrecord';
	$scope.goLogin = 'no';
	//Fetch the static data from google spreasheet
	// StaticService.fetchStaticData(); //todo - check for error
	$scope.newLogin = function(userName, password, rememberMe){
		var valDefer = StaticService.fetchStaticData();
		valDefer.then(function(){ $scope.login(userName, password, rememberMe);});

		// $timeout(function(){ $scope.login(userName, password, rememberMe);}, 20000);
	};

	$scope.login = function(userName, password, rememberMe) {
		//$state.go('tab.discover');
		console.log("username in localStorage.." + $localStorage['username']);
		console.log("password in localstorage.." + $scope.password);
		
		$localstorage.setObject('username', $scope.username);
		// console.log("username.." + $localStorage['username']);
		
				
		if(Utils.getBuildType() == "stub") {
			$state.go('tab.discover');
		}
		else {
			if( $scope.username == null || $scope.password == null){
				$scope.displayAlert("Missing input data !");
			}
			else {
				$requestParamArr = [];
				$requestParamArr.push({"UID":$scope.username});
				$requestParamArr.push({"password":$scope.password});
				$requestParamArr.push({"GrantType":"password"});
				
				$headerParamArr = [];
				$scope.showLoader();
				Utils.doHttpRequest('POST','http://vmdimisapp01:1322/api/Token/PostToken',$headerParamArr,$requestParamArr).then(function(response) {
					console.log("response from the API ..."+response);
					// to be deleted.
					//$state.go('tab.discover');
					if(response != null) {
						$message = response['message'];
						$data = response['data'];
						console.log("statusCode.." + $message['statusCode']);
						$scope.hideLoader();
						
						if($message['statusCode'] == 200) {
							$rootScope.authToken = $data['access_token'];
							console.log("authToken.." +  $rootScope.authToken);
							$state.go('tab.discover');
						} else {
							$scope.displayAlert("Wrong username or password !");
						}
					}
					else {
						//$scope.displayAlert("Can't reach server. You need to be connected to SCTE-DATA WiFi netwrok !");
						$scope.applicationGo = Utils.verifyUser($scope.username, $scope.password, $scope.userCred);
						console.log("user credentials verified");
						if($scope.applicationGo == "yes"){
							//$localstorage.setObject('username', $scope.username);
							//console.log("Username in the $scope :" +$localStorage['username']);
							$state.go('tab.discover');
						} else{
							$scope.displayAlert("Incorrect Username and Password");
						}						
					}
				});
			}
		}
	};

	$scope.joinSCTE = function()
	{
		$window.open('http://www.scte.org/SCTE/Join/FastForms/CreateAccount.aspx', "_blank");
	};
	
	$scope.forgotpassword = function()
	{
		$window.open('https://www.scte.org/SCTE/Sign_In.aspx', "_blank");
	};
}];