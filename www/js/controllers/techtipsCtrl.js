var TechtipsCtrl = ['$scope', '$state', '$rootScope', '$ionicModal', 'Utils', '$localStorage', '$sce', 
                            '$ionicPopup', '$q', '$window' ,
                            function ($scope, $state, $rootScope, $ionicModal, Utils, $localStorage, $sce, 
                            $ionicPopup, $q , $window) {

    //This is for the local storage.
    $scope.staticContent = [];
    $rootScope.globalTitle = "";
    $rootScope.globalContent = "";
    $scope.staticContent['techtips'] = $localStorage['staticcontent.techtips'];
    
    //$scope.staticcontent['primers'] = $localStorage['staticcontent.primers'];
    //Primes to be added in the techtip section after the techtips section.
    $scope.primersContents = $localStorage['staticcontent.primers'];
    //console.log("primers..................");
    //console.log($scope.primersContents);
    //Email to address has to be read from the spread sheet.
    $scope.emailToAdd = $localStorage['staticcontent.configs'][2];
   
    
     $scope.stopPropagation = function ($event) {
        console.log('event bubbling');
         $event.stopPropagation();
    };

    // $scope.ratingsCallback = function (rating) {
    //     Utils.displayAlert("Rating given : "+rating);
    //     console.log('Selected rating is : ', rating);
         
    // };

    $scope.primersContents.forEach(function (primer) {
        primer.rating=Math.round(primer.rating);
        console.log(primer.rating);
        primer.ratingsObject = {
        iconOn: 'ion-ios-star', //Optional
        iconOff: 'ion-ios-star-outline',  //Optional
        iconOnColor: 'rgb(65, 105, 225)',  //Optional
        iconOffColor: 'rgb(65, 105, 225)', //Optional
        rating: primer.rating,
//         callback: function (rating) {  //Mandatory    
//             Utils.displayAlert("Rating given : "+rating);
            
//         }
};
}, this);

    $scope.techTipsContents = $scope.staticContent['techtips'];

    $scope.techTipsContents.forEach(function (techTip) {
        techTip.rating=Math.round(techTip.rating);
        //console.log(techTip.rating);
        techTip.ratingsObject = {
            iconOn: 'ion-ios-star', //Optional
            iconOff: 'ion-ios-star-outline',  //Optional
            iconOnColor: 'rgb(65, 105, 225)',  //Optional
            iconOffColor: 'rgb(65, 105, 225)', //Optional
            rating: techTip.rating,
            //         callback: function (rating) {  //Mandatory    
            //             Utils.displayAlert("Rating given : "+rating);
                        
            //         }
        };


        if (techTip['videourl']) {
            //console.log("url.." + techTip['videourl']);
            var re = /^(https:\/\/www.youtube.com\/)(watch\?.*v=)(.*)$/;
            var subst = '$1embed/$3?enablejsapi=1';
            techTip['videourl'] = techTip['videourl'].replace(re, subst);
            console.log("url1111.." + techTip['videourl']);
            techTip['videourl'] = techTip['videourl'].replace("watch?time_continue=3&v=", "v/");
            //techTip['videourl'] = $sce.trustAsResourceUrl(techTip['videourl']);

        }
    }, this);


    $scope.primersContents.forEach(function (primer) {
            primer.rating=Math.round(primer.rating);
            //console.log(primer.rating);
            primer.ratingsObject = {
                iconOn: 'ion-ios-star', //Optional
                iconOff: 'ion-ios-star-outline',  //Optional
                iconOnColor: 'rgb(65, 105, 225)',  //Optional
                iconOffColor: 'rgb(65, 105, 225)', //Optional
                rating: primer.rating,
            };

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

    $scope.flag=[];
   // $scope.globalFlag=$rootScope.globalVideoflag;
      $scope.toggleImageAndVideo = function (index) {
      if($scope.flag[index]!='true'){
        //$rootScope.globalVideoflag='true';
      $scope.flag[index]='true';
        }

    };


    $scope.techtipRouter = function (title, content) {

        $rootScope.globalTitle = title;
        $rootScope.globalContent = content;

        $state.go('tab.techtipsleafcontent');
    };



    $scope.image = "img/video.jpeg";

    $scope.redirectDisover = function () {
        Utils.redirectDiscover();
    };

     $scope.relod = function () {
        alert("hiii");
    };


   

    
     $scope.techTipSubmitPage = function () {
            $state.go('tab.techtipsubmit');
        };

    $scope.openPage = function (url) {
        window.open(url, '_system');
    };

    
    $scope.techtip = "";
        $scope.techtipURL = "";

        $scope.techtipSubmit = function (tip, url) {
            console.log("inside submit techtip.." + tip);
            
            var subject = "SCTE Techtip";
            //var to = "techtips@scte.org";
            var to = $scope.emailToAdd["value"];
            
            var body = "Message: "+tip + "%0D%0A %0D%0A" + "URL: "+url;
            
            var link = "mailto:" + to + "?subject=" + subject + 
                            "&body="+ body;     
            $window.location.href = link;
            
            // var q = $q.defer();
            // cordova.plugins.email.isAvailable(function (isAvailable) {
            //     console.log('the email is isAvailable');
            // }, function (error) {
            //     console.log('No email client available');
            // });

            // cordova.plugins.email.open({
            //     to: 'techtips@scte.org', // email addresses for TO field
            //     cc: "", // email addresses for CC field
            //     bcc: "", // email addresses for BCC field
            //     attachments: "", // file paths or base64 data streams
            //     subject: "SCTE Techtip", // subject of the email
            //     body: tip + "<br/><br/>" + url, // email body (for HTML, set isHtml to true)
            //     isHtml: true, // indicats if the body is HTML or plain text
            // }).then(null, function () {
            //     console.log('User cancels the email.');
            // });
        }
}];
