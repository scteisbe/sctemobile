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
        ga('send', 'event', 'External ' + item.type + ' opened', item.os + ': ' + item.title, AppConstants.fromAppLibraryTab);
        ga('send', 'event', 'External ' + item.type, 'opened', item.title);
        window.open(item.url, AppConstants.system);
    };

}];
