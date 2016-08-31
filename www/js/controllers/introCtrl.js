var introCtrl = ['$scope', '$state', 'AppConstants','$localStorage', function($scope, $state, AppConstants,$localStorage) {
    $scope.buttonName = AppConstants.introSkipIntro;
    $scope.cards = [{
        "id": 1,
        "title": "Connect to technology with CORTEX Mobile.",
        "desc": "The SCTE/ISBE CORTEX Expert Development System enhances your learning by providing 24/7 access to technical information in the palm of your hand.",
        "status": "swipe to learn more"
    }, {
        "id": 2,
        "img": "img/CORTEX_App_Icon_Group1.png",
        "desc": "CORTEX delivers tech resources, industry apps and the latest content from SCTE/ISBE’s extensive course catalog at the moment of need on the job site.",
        "status": "swipe to learn more"
    }, {
        "id": 3,
        "img": "img/CORTEX_App_Icon_Group2.png",
        "desc": "Search for product docs and tech specs, access SCTE/ISBE’s resource library, and explore our on-the-job toolkit to improve your job performance.",
        "status": "swipe to learn more"
    }, {
        "id": 4,
        "img": "img/CORTEX_App_Icon_Group3.png",
        "desc": "The SCTE/ISBE CORTEX Expert Development System follows your learning plans and tracks progress to guide you to become an expert and advance your career.",
        "status": "swipe to get started"
    }];

    if($localStorage['showIntro']) {
        $scope.introFilter = $localStorage['showIntro'];
    } else {
        $scope.introFilter = false;
        $localStorage['showIntro'] =  $scope.introFilter;
    }
   
    $scope.toggleIntro = function(isChecked) {
        $scope.introFilter = isChecked;
        $localStorage['showIntro'] =  $scope.introFilter;
    }

    $scope.addCard = function(i) {
        var newCard = $scope.cards.push();
        $scope.cards.push(newCard);
    };

    $scope.cardSwipedLeft = function(index) {
        var arrCount = $scope.cards.length;
        if (arrCount <= 1) {
            //localStorage['ngStorage-noIntro'] = AppConstants.true;
            $state.go(AppConstants.tabdiscoverName);
        }
    };

    $scope.cardSwipedRight = function(index) {
        var arrCount = $scope.cards.length;
        if (arrCount <= 1) {
            //localStorage['ngStorage-noIntro'] = AppConstants.true;
            $state.go(AppConstants.tabdiscoverName);
        }
    };

    $scope.cardDestroyed = function(index) {
        var arrCount = $scope.cards.length;
        if (arrCount <= 2) {
            $scope.buttonName = AppConstants.done;

        }
        $scope.cards.splice(index, 1);
    };

    $scope.cardPartialSwipe = function(amt) {
        //...
    };

    /* redirection to discover page */
    $scope.skipIntro = function() {
        //localStorage['ngStorage-noIntro'] = 'true';
        $state.go(AppConstants.tabdiscoverName);
    };

}];
