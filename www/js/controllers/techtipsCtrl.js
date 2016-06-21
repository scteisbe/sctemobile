var TechtipsCtrl = ['$scope', '$state', '$rootScope', '$ionicModal', 'Utils', '$localStorage', '$sce','$ionicPopup', '$q', function($scope, $state, $rootScope, $ionicModal, Utils, $localStorage, $sce,$ionicPopup, $q) {

    //This is for the local storage.
    $scope.staticContent = [];
    $rootScope.globalTitle="";
    $rootScope.globalContent="";
    $scope.staticContent['techtips'] = $localStorage['staticcontent.techtips'];

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
         // var re = /^(https:\/\/www.youtube.com\/)(watch\?.*v=)(.*)$/;
         // var subst = '$1embed/$3'; 
         //      techTip['videourl']=techTip['videourl'].replace(re, subst);
         //      console.log("url1111.." + techTip['videourl']);
         //      techTip['videourl']=techTip['videourl'].replace("watch?time_continue=3&v=", "v/");
            //techTip['videourl'] = $sce.trustAsResourceUrl(techTip['videourl']);
            
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
            var q = $q.defer();
            cordova.plugins.email.isAvailable(function (isAvailable) {
            console.log('the email is isAvailable');
            }, function(error){
            console.log('No email client available');
            });

            cordova.plugins.email.open({
                to: 'deepak_jha09@infosys.com', // email addresses for TO field
                cc:          "", // email addresses for CC field
                bcc:         "", // email addresses for BCC field
                attachments: "", // file paths or base64 data streams
                subject:    "test email from device", // subject of the email
                body:       "This is the test email message from the device.", // email body (for HTML, set isHtml to true)
                isHtml:    true, // indicats if the body is HTML or plain text
            }).then(null, function(){
                console.log('User cancels the email.');
            });
        }
    };
}];
