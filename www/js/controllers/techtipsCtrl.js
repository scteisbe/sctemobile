var TechtipsCtrl = ['$scope', '$state', '$rootScope', '$ionicModal', 'Utils', '$localstorage', '$sce','$ionicPopup', function($scope, $state, $rootScope, $ionicModal, Utils, $localstorage, $sce,$ionicPopup) {

    //This is for the local storage.
    $scope.staticContent = [];
    $rootScope.globalTitle="";
    $rootScope.globalContent="";
    $scope.staticContent['techtips'] = $localstorage.getObject('staticcontent.techtips');

    $scope.ratingsObject = {
    iconOn: 'ion-ios-star', //Optional
    iconOff: 'ion-ios-star-outline',  //Optional
    iconOnColor: 'rgb(200, 200, 100)',  //Optional
    iconOffColor: 'rgb(200, 100, 100)', //Optional
    rating: 0,  
    callback: function(rating) {  //Mandatory    
      $scope.ratingsCallback(rating);
    }
  };

    $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
    };

    $scope.techTipsContents = $scope.staticContent['techtips'];

    $scope.techTipsContents.forEach(function(techTip) {
        if (techTip['videourl']) {
            console.log("url.." + techTip['videourl']);
            techTip['videourl'] = $sce.trustAsResourceUrl(techTip['videourl']);
        }
    }, this);

    // $scope.techTipsContents = [{
    //     "type" : "video",
    //     "techtips_image" : "img/video-placeholder.jpg",
    //     "techtips_title" : "Understanding Cable Technology: Digital Video"
    // }, {
    //     "type" : "pdf",
    //     "techtips_image" : "img/pdf-placeholder.png",
    //     "techtips_title" : "Remote Power Outage",
    //     "techtips_description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    // }];

    /*    $scope.techTipsContentIteration = function() {
            if()
        };*/

    

    $scope.techtipRouter = function(title,content) {
        
         $rootScope.globalTitle=title;
         $rootScope.globalContent=content;
         
        $state.go('tab.techtipsleafcontent');
    };

    $scope.initialize= function() {
        this.bindEvents();
    };
   $scope. bindEvents= function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    };
    $scope.onDeviceReady=function() {
        
    };
    $scope.playVideo= function(url) {
        YoutubeVideoPlayer.openVideo(url);
    };

    $scope.image = "img/video.jpeg";

    $scope.redirectDisover = function() {
        Utils.redirectDiscover();
    };



    $scope.showPopup = function() {
        $scope.submitTechtip();
    };

    $scope.openPage = function(url) {
        window.open(url, '_system');
    };

    $scope.submitTechtip = function($message) {
        console.log("into submit techtip.." + $message);

        var myPopup = $ionicPopup.show({
            templateUrl: 'templates/techTipSubmitpopup.html',
            cssClass: "techtip-popup-main",
            scope: $scope,

        });

        $scope.closeTechtip = function() {
            myPopup.close();
        };

        $scope.techtip = "";
        $scope.techtipURL = "";

        $scope.techtipSubmit = function(tip, url) {
            console.log("inside submit techtip", tip);
        }


    };
}];
