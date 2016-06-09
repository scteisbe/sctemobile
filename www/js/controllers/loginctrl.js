var  loginCtrl =  ['$scope', '$state', '$rootScope','$http','$ionicLoading','$ionicPopup','$localStorage','Utils', function($scope,$state, $rootScope,$http, $ionicLoading, $ionicPopup,$localStorage, Utils){

	// Just for developmet, need to remove before production release
	$scope.username = 'maggie';
	$scope.password = 'testrecord';
	
	$scope.login = function(userName, password, rememberMe){
		//$state.go('tab.discover');
		console.log("username.." + $scope.username);
		console.log("password.." + $scope.password);
		
		if(Utils.getBuildType() == "stub"){
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
					console.log(response);
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
				});
			}
		}
	};

	$scope.joinSCTE = function()
	{
		$scope.hideLoader();
	};
	
	$scope.forgotpassword = function()
	{
		//$scope.showLoader();
	};
}];