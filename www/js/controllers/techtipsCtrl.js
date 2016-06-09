var TechtipsCtrl = ['$scope', '$state', '$rootScope', '$ionicModal', function($scope, $state, $rootScope, $ionicModal) {
    $scope.ratingsObject = {
        iconOn: 'ion-ios-star',
        iconOff: 'ion-ios-star-outline',
        iconOnColor: 'rgb(200, 200, 100)',
        iconOffColor: 'rgb(200, 100, 100)',
        rating: 0,
        minRating: 1,
        callback: function(rating) {
            $scope.ratingsCallback(rating);
        }
    };

    $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
    };

    $scope.techtipRouter = function() {
        $state.go('tab.digitalleakage');
    };

    $scope.image = "img/video.jpeg";

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
}];
