var TechtipsCtrl = ['$scope', '$state', '$rootScope', '$ionicModal', 'Utils', '$localStorage', '$sce', 
                            '$ionicPopup', '$q', '$window' ,'AppConstants',
                            function ($scope, $state, $rootScope, $ionicModal, Utils, $localStorage, $sce, 
                            $ionicPopup, $q , $window, AppConstants) {

    //This is for the local storage.
    $scope.staticContent = [];
    $rootScope.globalTitle = "";
    $rootScope.globalContent = "";
    $scope.staticContent['techtips'] = $localStorage['staticcontent.techtips'];
    
    //$scope.staticcontent['primers'] = $localStorage['staticcontent.primers'];
    //Primes to be added in the techtip section after the techtips section.
    $scope.primersContents = $localStorage['staticcontent.primers'];
    $scope.primersErrorMsg='';
    tempPrimers= $scope.primersContents;
    if(tempPrimers==null || tempPrimers.length==0){
            $scope.primersErrorMsg=AppConstants.noData;
    }
    //Email to address has to be read from the spread sheet.
    var config = $localStorage['staticcontent.configs'];
    
    config.forEach(function(element) {
        if(element['key'] == 'submit_tech_tip_email_address')
            $scope.emailToAdd = element['value'];
        if(element['key'] == 'submit_tech_tip_description')
            $scope.submitDesc = element['value'];
    }, this);
   
    
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
            var re = /^(https:\/\/www.youtube.com\/)(watch\?.*v=)(.*)$/;
            var subst = '$1embed/$3?enablejsapi=1';
            techTip['videourl'] = techTip['videourl'].replace(re, subst);
            console.log("url1111.." + techTip['videourl']);
            techTip['videourl'] = techTip['videourl'].replace("watch?time_continue=3&v=", "v/");

        }
    }, this);


    $scope.primersContents.forEach(function (primer) {
            primer.rating=Math.round(primer.rating);
            primer.ratingsObject = {
                iconOn: 'ion-ios-star', //Optional
                iconOff: 'ion-ios-star-outline',  //Optional
                iconOnColor: 'rgb(65, 105, 225)',  //Optional
                iconOffColor: 'rgb(65, 105, 225)', //Optional
                rating: primer.rating,
            };

    }, this);
    

    $scope.flag=[];
      $scope.toggleImageAndVideo = function (index) {
      if($scope.flag[index]!='true'){
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
    
     $scope.techTipSubmitPage = function () {
            ga('send', 'event', AppConstants.submitTechTipButton, AppConstants.tap, 'from TechTips tab');
            $state.go('tab.techtipsubmit');
        };

    $scope.openPage = function (url) {
        window.open(url, '_system');
    };

    
    $scope.techtip = "";
        $scope.techtipURL = "";

        $scope.techtipSubmit = function (tip, url) {
            ga('send', 'event', AppConstants.submitTechTip, AppConstants.submitted);
            var subject = "SCTE Techtip";
            var to = $scope.emailToAdd;
            var body = "Message: "+tip + "%0D%0A %0D%0A" + "URL: "+url;
            var link = "mailto:" + to + "?subject=" + subject + "&body="+ body;
            $window.location.href = link;
        }
}];
