var appCtrl = ['$state','$rootScope','$scope', '$compile', '$filter', '$ionicLoading','$ionicPopup','Utils', function($state,$rootScope,$scope, $compile, $filter, $ionicLoading,$ionicPopup,Utils,$window){
	
/*-----------Ionic Loader----------------*/
$scope.showLoader = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="ios"></ion-spinner>'
    });
  };
  
$scope.hideLoader = function(){
    $ionicLoading.hide();
};

 $scope.displayAlert = function($message) {
    console.log("into displayAlert.." + $message);
    $ionicLoading.hide();
        
    if(navigator != null && navigator.notification != null ) {
        navigator.notification.alert (
            $message,  // message
            alertDismissed,         // callback
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
};

function alertDismissed() {
	colsole.log("in alertDismissed..");
}

$scope.cortexLogo = '<img src="img/cortex_logo.png" class="header-corter-logo">';
	
}];