var loginCtrl = ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', '$ionicPopup', '$localStorage', 'Utils', '$q', 'StaticService', '$timeout', '$window', '$location',	function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup, $localStorage, Utils, $q, StaticService, $timeout, $window, $location) {

		//Utils.scteSSOAuthenticate();
		//Auto login code
		if($localStorage['authToken'] != null) {
			//$state.go('tab.discover');
			//$rootScope.authToken = $localStorage['authToken'];
		}
		
		$scope.userCred = [{
			"username": "maggie",
			"password": "testrecord"
		},
			{
				"username": "testUser1",
				"password": "testrecord"
			},
			{
				"username": "testUser2",
				"password": "testrecord"
			}];

		// Just for developmet, need to remove before production release	
		$scope.username = 'tester@scte.org';
		$scope.password = 'scte1234';
		
		$scope.goLogin = 'no';
		//Fetch the static data from google spreasheet
		// StaticService.fetchStaticData(); //todo - check for error
		$scope.newLogin = function (userName, password, rememberMe) {
			var valDefer = StaticService.fetchStaticData();
			valDefer.then(function () { $scope.login(userName, password, rememberMe); });

			// $timeout(function(){ $scope.login(userName, password, rememberMe);}, 20000);
		};

		$scope.login = function (userName, password, rememberMe) {
			//$state.go('tab.discover');
			console.log("username123.." + $scope.username);
			console.log("password.." + $scope.password);

			if (Utils.getBuildType() == "stub") {
				$state.go('tab.discover');
			}
			else {
				if ($scope.username == null || $scope.password == null) {
					$scope.displayAlert("Missing input data !");
				}
				else {
					$requestParamArr = [];
					$requestParamArr.push({ "UID": $scope.username });
					$requestParamArr.push({ "password": $scope.password });
					$requestParamArr.push({ "GrantType": "password" });

					$headerParamArr = [];
					$scope.showLoader();
					Utils.doHttpRequest('POST', 'https://devapi.scte.org/mobileappui/api/Token/PostToken', $headerParamArr, $requestParamArr).then(function (response) {
						console.log("response from the API ..." + response);
						// to be deleted.
						// $state.go('tab.discover');
						if (response != null) {
							$message = response['message'];
							$data = response['data'];
							console.log("statusCode.." + $message['statusCode']);
							$scope.hideLoader();

							if ($message['statusCode'] == 200) {
								$rootScope.authToken = $data['access_token'];
								$localStorage['username'] = $scope.username;
								$localStorage['password'] = $scope.password;
								$localStorage['authToken'] = $rootScope.authToken;
								console.log("authToken.." + $rootScope.authToken);
								$state.go('tab.discover');
								
								
							} else {
								$scope.displayAlert("Wrong username or password !");
							}
						}
						else {
							console.log("into else of Login Controller..");
							$scope.displayAlert("Can't reach server !");
							$scope.applicationGo = Utils.verifyUser($scope.username, $scope.password, $scope.userCred);
							console.log("user credentials verified");
							if ($scope.applicationGo == "yes") {
								//$localstorage.setObject('username', $scope.username);
								//console.log("Username in the $scope :" +$localStorage['username']);
								$state.go('tab.discover');
							}
						}
					});
				}
			}
		};

		$scope.redirect = function (pageName) {
			
			switch(pageName){
				case 'discover':
					$location.path('tab/discover');
					break;
				case 'mylearning':
					$location.path('tab/mylearning');
					break;	
				case 'techtips':
					$location.path('tab/techtips');
					break;
				case 'applibrary':
					$location.path('tab/applibrary');
					break;
				case 'resource':
					$location.path('tab/resource');
					break;			
			}
		};


		$scope.joinSCTE = function () {
			var myURL = encodeURI('http://www.scte.org/SCTE/Join/FastForms/CreateAccount.aspx');
            window.open(myURL, '_system');
			//$window.open('', "_system");
			//$window.open.href = "http://www.scte.org/SCTE/Join/FastForms/CreateAccount.aspx";
		};

		$scope.forgotpassword = function () {
			var myURL = encodeURI('https://www.scte.org/SCTE/Sign_In.aspx');
            window.open(myURL, '_system');
			//$window.open('', "_system");
		};
	}];