var TechtipsCtrlTitle = ['$scope', '$rootScope', function($scope, $rootScope) {

    $scope.fetchData = function() {
	    $scope.title= $rootScope.globalTitle;
	    $scope.content=$rootScope.globalContent;
    };
    
}];
