var introCtrl = ['$scope', '$http', '$state', function($scope, $http, $state) {
    // $scope.showLoader();

    // $http.get('json/intro.json').success(function(res) {
    //     $scope.cards = res;
    // }).catch(function(err) {
    //     console.log("Error introCtrl: " + err);
    // }).finally(function() {
    //     $scope.hideLoader();
    // });
    $scope.buttonName = 'SKIP INTRO';
    $scope.cards = [{
        "id": 1,
        "title": "Welcome to Cortex",
        "img": "img/ph.jpg",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus malesuada vitae ipsum vel gravida. Etiam ultrices turpis neque, at blandit sem condimentum vitae.",
        "status": "Swipe to continue"
    }, {
        "id": 2,
        "title": "Cortex mobile provides technical resources and support to SCTE members on the move",
        "img": "img/ph.jpg",
        "desc": "Latest SCTE learning, reference and technical materials",
        "status": "Swipe to continue"
    }, {
        "id": 3,
        "title": "Cortex mobile provides technical resources and support to SCTE members on the move",
        "img": "img/ph.jpg",
        "desc": "Product-specific information from industry partners",
        "status": "Swipe to continue"
    }, {
        "id": 4,
        "title": "Cortex mobile provides technical resources and support to SCTE members on the move",
        "img": "img/ph.jpg",
        "desc": "Digital library of apps, tools, pocket guides and tech tips",
        "status": "Swipe or Tab Done"
    }];

    $scope.addCard = function(i) {
        var newCard = $scope.cards.push();
        $scope.cards.push(newCard);
    };

    // for (var i = 0; i < 4; i++) $scope.addCard();

    $scope.cardSwipedLeft = function(index) {
        console.log('Left swipe');
        console.log(index);
        var arrCount= $scope.cards.length;
        if(arrCount <= 1)
        {
           $state.go('tab.discover');
        }
    };

    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe');
        var arrCount= $scope.cards.length;
        if(arrCount <= 1)
        {
           $state.go('tab.discover');
        }
    };

    $scope.cardDestroyed = function(index) {
        var arrCount= $scope.cards.length;
        if(arrCount <= 2)
        {
            $scope.buttonName = 'DONE';
        }
        
        $scope.cards.splice(index, 1);
        console.log('Card removed' + arrCount);
        
    };

    $scope.cardPartialSwipe = function(amt)
    {
    }

    $scope.skipIntro = function() {
        $state.go('tab.discover');
    };

}];
