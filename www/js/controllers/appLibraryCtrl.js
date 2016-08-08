var AppLibraryCtrl = ['$scope', '$state', '$rootScope', 'Utils', '$localStorage','AppConstants', function($scope, $state, $rootScope, Utils, $localStorage,AppConstants) {
    $scope.staticContent = [];
    $scope.androidPlatform = [];
    $scope.iosPlatform = [];
    $scope.platform = ionic.Platform.platform();
    $scope.staticContent['apps'] = $localStorage['staticcontent.apps'];
    $scope.appList = $scope.staticContent['apps'];

    $scope.redirectDisover = function() {
        ga(AppConstants.send, AppConstants.event, AppConstants.searchButton, AppConstants.tap, AppConstants.fromAppLibraryTab);
        Utils.redirectDiscover();
    };

    $scope.openPage = function(item) {
        ga(AppConstants.send, AppConstants.event, item.type, AppConstants.fromAppLibraryTab, item.title);
        window.open(item, AppConstants.system);
    };

}];
