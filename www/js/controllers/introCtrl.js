var introCtrl = ['$scope', '$state', 'AppConstants', function($scope, $state, AppConstants) {
    $scope.buttonName = AppConstants.introSkipIntro;
    $scope.cards = [{
        "id": 1,
        "title": "Connect to technology with CORTEX Mobile.",
        "desc": "The SCTE/ISBE CORTEX Expert Development System enhances your learning by providing 24/7 access to technical information in the palm of your hand.",
        "status": "Swipe to learn more"
    }, {
        "id": 2,
        "img": "img/CORTEX_App_Icon_Group1.png",
        "desc": "CORTEX delivers tech resources, industry apps and the latest content from SCTE/ISBE’s extensive course catalog at the moment of need on the job site.",
        "status": "Swipe to learn more"
    }, {
        "id": 3,
        "img": "img/CORTEX_App_Icon_Group2.png",
        "desc": "Search for product docs and tech specs, access SCTE/ISBE’s resource library, and explore our on-the-job toolkit to improve your job performance.",
        "status": "Swipe to learn more"
    }, {
        "id": 4,
        "img": "img/CORTEX_App_Icon_Group3.png",
        "desc": "The SCTE/ISBE CORTEX Expert Development System follows your learning plans and tracks progress to guide you to become an expert and advance your career.",
        "status": "Swipe to get started"
    }];

    $scope.addCard = function(i) {
        var newCard = $scope.cards.push();
        $scope.cards.push(newCard);
    };

    $scope.cardSwipedLeft = function(index) {
        console.log('Left swipe');
        console.log(index);
        var arrCount = $scope.cards.length;
        if (arrCount <= 1) {
            localStorage['ngStorage-noIntro'] = 'true';
            $state.go('tab.discover');
        }
    };

    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe');
        var arrCount = $scope.cards.length;
        if (arrCount <= 1) {
            localStorage['ngStorage-noIntro'] = 'true';
            $state.go('tab.discover');
        }
    };

    $scope.cardDestroyed = function(index) {
        var arrCount = $scope.cards.length;
        if (arrCount <= 2) {
            $scope.buttonName = AppConstants.done;

        }
        $scope.cards.splice(index, 1);
        console.log('Card removed' + arrCount);
    };

    $scope.cardPartialSwipe = function(amt) {
        //...
    };

    /* redirection to discover page */
    $scope.skipIntro = function() {
        localStorage['ngStorage-noIntro'] = 'true';
        $state.go('tab.discover');
    };

}];
