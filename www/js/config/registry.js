  var cortexConfig = angular.module('cortexConfig', ['ionic', 'ionic-ratings', 'ionic-datepicker',
      'ngHolder',
      'ngStorage',
      'times.tabletop',
      'ionic.service.analytics',
      'ionic.contrib.ui.tinderCards',
      'autofocus'
  ]);



  var deploy = new Ionic.Deploy();

  cortexConfig.config(appRoute)

  cortexConfig.run(['$rootScope', '$location', '$window', '$ionicPlatform', '$state', '$ionicPopup', '$localStorage', '$ionicHistory',
      function($rootScope, $location, $window, $ionicPlatform, $state, $ionicPopup, $localStorage, $ionicHistory) {
          $rootScope.$on("$locationChangeStart", function(event, next, current) {
              // if ($rootScope.globalVideoflag + "flag") {
              //     var state = 'pause';
              //     var div = document.getElementById("popupVid");
              //     var iframetemp = document.getElementsByTagName("iframe");
              //     for (i = 0; i < iframetemp.length; i++) {
              //         var iframe = document.getElementsByTagName("iframe")[i].contentWindow;
              //         div.style.display = state == 'hide' ? '' : '';
              //         func = 'stopVideo';
              //         iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
              //     }
              // }
          });

          $rootScope.$on('$stateChangeSuccess', function(evt, toState) {
              if (toState.changeColor) {
                  $rootScope.changeColor = true;
              } else {
                  $rootScope.changeColor = false;
              }
          });


          var clientId = $localStorage['clientId'] || _.random(1, true).toString().replace("0.", "");
          $localStorage['clientId'] = clientId;

          $window.ga('create', 'UA-1851425-10', {
              'storage': 'none',
              'clientId': clientId
          });

          $window.ga('set', 'checkProtocolTask', null); // Disable file protocol checking because Ionic serves from file:// on actual devices

          $rootScope.$on('$stateChangeSuccess', function(event) {
              setTimeout(function() {
                  $window.ga('send', 'pageview', $location.path());
              }, 300)
          });

          //Network event listener

          $rootScope.online = navigator.onLine;
          $window.addEventListener("offline", function() {
              $rootScope.$apply(function() {
                  $rootScope.online = false;
              });
          }, false);
          $window.addEventListener("online", function() {
              $rootScope.$apply(function() {
                  $rootScope.online = true;
              });
          }, false);


          $ionicPlatform.registerBackButtonAction(function(e) {
              e.preventDefault();
              // Is there a page to go back to?
              if ($ionicHistory.currentView().title === 'Discover') {
                  ionic.Platform.exitApp();
              } else {
                  $ionicHistory.goBack();
              }
              return false;
          }, 101);


      }
  ]);

  cortexConfig.run(['$ionicPlatform', 'StaticService', function($ionicPlatform, StaticService) {

      //Fetch the data
      //     console.log("Gauri:in run");
      //StaticService.initAPIContainer();
      StaticService.fetchStaticData();
      $ionicPlatform.ready(function() {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);

          }
          if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleLightContent();
          }

      });
  }]);

  cortexConfig.run(['$ionicPlatform', '$ionicAnalytics', function($ionicPlatform, $ionicAnalytics) {
      $ionicPlatform.ready(function() {
          $ionicAnalytics.register({
              silent: false, // By default all analytics events are logged to the console for debugging. The silent flag disables this.
              dryRun: false // dryRun=true won't send any events to the analytics backend. (useful during development)
          });
      });
  }]);

  cortexConfig.config(function($ionicConfigProvider) {
      // force Android tabs to bottom
      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.backButton.icon('ion-ios-arrow-left');
      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');
      $ionicConfigProvider.backButton.text('Back');
      $ionicConfigProvider.backButton.previousTitleText(false);
      $ionicConfigProvider.views.swipeBackEnabled(false);
  });

  // To read the data from google spreadshee.
  cortexConfig.config(['TabletopProvider', function(TabletopProvider) {
      TabletopProvider.setTabletopOptions({
          //key: '1_-dt2DoMrDJZ0MR57Ysh6m6HyEn2UE80ckH-7ALx2nI',
          key: '1KTe0AcWPrApY8qOzTV_lJrftDxo0ZDRB7DYtzZfvFLY',
          simpleSheet: false,
          //callback: $storeDataProvider.storeData,
      });
  }]);

  /*********************** Constant Properties **************************/
  /***********************************************************************************/

  cortexConfig.constant("AppConstants", {
      /*** InkLing Constatnts  ***/
      "inkLingDomainAddr": "inkling.com",
      "googlePlayStoreLink": "https://play.google.com/store/apps/details?id=com.inkling.android.axis&hl=en",
      "appleAppStoreLink": "https://itunes.apple.com/us/app/inkling-axis/id923550071?mt=8",
      "inkLingMessage": "This course material is available in the Inkling Axis app. Once you have it installed, you'll be able to read it there.",
      "inkLingtitle": " Inkling Axis :",
      /*** General Constatnts  ***/

      "done": "Get Started",
      "cantReachServer": "Can't reach server !",
      "noInternet": "Internet not available. Please check network connectivity.",
      "system": '_system',
      "searchServerErrorMsg": "Search request failed ! Please try after sometime !",
      "noData": "NO DATA AVAILABLE",
      /*** StatusCode Constatnts  ***/
      "status105": 105,
      "status200": 200,
      "status401": 401,
      /*** Routing Constatnts  ***/


      /***Names for pages ***/
      "loginName": 'login',
      "introName": 'intro',
      "tabdictionaryviewName": 'tab.dictionaryview',
      "tabName": 'tab',
      "tabdiscoverName": 'tab.discover',
      "tabsearchresultName": 'tab.searchresults',
      "tabdiscoversmyEvents": 'tab.discoversmyevents',
      "tabrssfeedsName": 'tab.rssfeeds',
      "tabnctaName": 'tab.ncta',
      "tabmylearningName": 'tab.mylearning',
      "tabmylearningcompletedName": 'tab.mylearning.completed',
      "tabmylearningallcoursesName": 'tab.mylearning.allcourses',
      "tabgamesviewmodalName": 'tab.gamesViewModal',
      "tabapplibraryName": 'tab.applibrary',
      "tabtechtipsName": 'tab.techtips',
      "tabtechtipsubmitName": 'tab.techtipsubmit',
      "tabtechtipsleafcontentName": 'tab.techtipsleafcontent',
      "tabresourceName": 'tab.resource',
      "tabscteSTDName": 'tab.resource.scteSTD',
      "tabwhitepaperName": 'tab.whitepaper',
      "tabarchivedwebinarsName": 'tab.archivedwebinars',
      "tabeventsdetailsName": 'tab.eventsdetails',

      /*** Page Location ***/
      "loginPage": "templates/welcome/login.html",
      "introPage": "templates/welcome/intro.html",
      "tabdictionaryviewPage": "templates/resource/dictionary.html",
      "tabPage": "templates/tabs.html",
      "tabdiscoverPage": "templates/discover/discover.html",
      "tabsearchresultPage": "templates/discover/search-results.html",
      "tabdiscoversmyeventsPage": "templates/discover/events.html",
      "tabrssfeedsPage": "templates/discover/rss-feeds.html",
      "tabnctaPage": "templates/discover/ncta.html",
      "tabmylearningPage": "templates/mylearning/mylearning.html",
      "tabmylearningcompletedPage": "templates/mylearning/completed-course-and-module-list.html",
      "tabmylearningallcoursesPage": "templates/mylearning/allcourses-course-and-module-list.html",
      "tabgamesviewmodalPage": "templates/mylearning/games.html",
      "tabapplibraryPage": "templates/applibrary/app-library.html",
      "tabtechtipsPage": "templates/techtips/techtips.html",
      "tabtechtipsubmitPage": "templates/techtips/submit-techtip.html",
      "tabtechtipsleafcontentPage": "templates/techtips/techtip-content.html",
      "tabresourcePage": "templates/resource/resource.html",
      "tabscteSTDPage": "templates/resource/scte-standards.html",
      "tabwhitepaperPage": "templates/resource/whitepaper.html",
      "tabarchivedwebinarsPage": "templates/resource/archivedwebinars.html",
      "tabeventsdetailsPage": "templates/discover/event-details.html",

      /*** Page Url ***/
      "loginURL": "/login",
      "introURL": "/intro",
      "tabdictionaryviewURL": "/dictionaryview/:focusAlpha",
      "tabURL": "/tab",
      "tabdiscoverURL": "/discover",
      "tabsearchresultURL": "/discover/searchresults",
      "tabdiscoversmyeventsURL": "/events",
      "tabrssfeedsURL": "/rss",
      "tabnctaURL": "/ncta",
      "tabmylearningURL": "/mylearning",
      "tabmylearningcompletedURL": "/completed",
      "tabmylearningallcoursesURL": "/allcourses",
      "tabgamesviewmodalURL": "/mylearning/games",
      "tabapplibraryURL": "/applibrary",
      "tabtechtipsURL": "/techtips",
      "tabtechtipsubmitURL": "/techtipsubmit",
      "tabtechtipsleafcontentURL": "/techtipsleafcontent",
      "tabresourceURL": "/resource",
      "tabscteSTDURL": "/SCTE-STANDARDS",
      "tabwhitepaperURL": "/whitepaper",
      "tabarchivedwebinarsURL": "/archivedwebinars",
      "tabeventsdetailsURL": "/events/eventsdetails/:id",
      "tabDiscoverURLSub": "tab/discover",

      /*** Controller Names ***/
      "loginCtrl": "loginCtrl",
      "introCtrl": "introCtrl",
      "tabdictionaryviewCtrl": "dictionaryCtrl",
      "tabdiscoverCtrl": "DiscoverCtrl",
      "tabsearchresultCtrl": "SearchResultsCtrl",
      "tabdiscoversmyeventsCtrl": "DiscoverEventCtrl",
      "tabmylearningCtrl": "MyLearningCtrl",
      "tabapplibraryCtrl": "AppLibraryCtrl",
      "tabtechtipsCtrl": "TechtipsCtrl",
      "tabtechtipsleafcontentCtrl": "TechtipsCtrlTitle",
      "tabresourceCtrl": "ResourceCtrl",
      "tabeventsdetailsCtrl": "DiscoverEventsDetailCtrl",

      /*** Parent Names ***/
      "mylearningParent": 'tab.mylearning',

      /*** Title Names ***/
      "discoverTitle": "Discover",
      "eventsTitle": "Events",
      "myLearningTitle": "My Learning",
      "appLibraryTitle": "App Library",
      "techTipTitle": "Tech Tip",
      "resourcesTitle": "Resources",
      "nctaTitle": "NCTA",

      /*** Google Analytics Constatnts  ***/
      "send": "send",
      "event": "event",
      "searchButton": "Search button",
      "tap": "tap",
      "promoBanner": 'Promo banner',
      "userId": 'userId',
      "set": 'set',
      "fromAppLibraryTab": "from app library tab",
      "fromDiscoverTab": 'Opened from discover tab',
      "fromFeaturedResourcesTab": 'Opened from featured resources',

      /*** API URL Constatnts  ***/
      "GET": 'GET',
      "eventAPI": 'https://devapi.scte.org/mobileappui/api/Events/GetEvents',

      /*** SearchCtrl Constatnts  ***/
      "searchErrorMsg": "No Results Found!!!",
      "searchFilterMessage": "No results available for the selection!!!",
      /*** DiscoverCtrl Constatnts  ***/
      "discoverNoInternet": "Internet not available. Please check network connectivity.",
      "discoverEventAddSuccess": "Event added Successfully",
      "discoverEventAddFail": "Event Couldnot be added: ",
      "discoverEventsAlreadyAvailable": "Event is already added in your calendar.",
      "discoverErrorInCalendar": "Error in calendar.",
      "speakNow": "Please Speak now",
      "enUS": "en-US",
      "informedURL": "http://www.cablelabs.com/news-events/blog",
      "nctaURL": "https://www.ncta.com/platform/feed/",
      "recentSearchesPage": 'templates/discover/recent-searches.html',
      "UUID": "UUID : ",
      "datePattern": "HH:mm:ss",
      "startTime": "00:00:00",

      /*** DiscoverEventCtrl Constatnts  ***/
      "relevantEvents": "relevantEvents",
      "liveLearnings": "liveLearnings",
      "nationalEvents": "nationalEvents",
      /*** IntroCtrl Constatnts  ***/
      "introSkipIntro": "Get Started",
      /*** LoginCtrl Constatnts  ***/
      "loginMissingInputData": "Missing input data !",
      "wrongUserNamePassword": "Wrong username or password !",
      /*** DictionaryCtrl Constatnts  ***/
      "dictionarySearchAcronym": "You can search for acronym definitions from the main search. Use the letters below to browse.",
      "all": 'all',
      /*** StaticCtrl Constatnts  ***/
      "staticNoentriesFound": "No entries found. Are there empty rows in the sheet?"
  });




  /*********************** Controller Configuration Section **************************/
  /***********************************************************************************/
  cortexConfig.controller('appCtrl', appCtrl)
  cortexConfig.controller('loginCtrl', loginCtrl)
  cortexConfig.controller('introCtrl', introCtrl)
  cortexConfig.controller('dictionaryCtrl', dictionaryCtrl)
  cortexConfig.controller('AppLibraryCtrl', AppLibraryCtrl)
  cortexConfig.controller('DiscoverCtrl', DiscoverCtrl)
  cortexConfig.controller('DiscoverEventCtrl', DiscoverEventCtrl)
  cortexConfig.controller('SearchResultsCtrl', SearchResultsCtrl)
  cortexConfig.controller('DiscoverEventsDetailCtrl', DiscoverEventsDetailCtrl)
  cortexConfig.controller('MyLearningCtrl', MyLearningCtrl)
  cortexConfig.controller('ResourceCtrl', ResourceCtrl)
  cortexConfig.controller('TechtipsCtrl', TechtipsCtrl)
  cortexConfig.controller('TechtipsCtrlTitle', TechtipsCtrlTitle)

  /***************************Service & Factory********************************************************/
  /****************************************************************************************************/

  cortexConfig.factory('StaticService', StaticService)
  cortexConfig.factory('Utils', Utils)


  //cortexConfig.service()


  /*********************** Directives Configuration Section **************************/
  /***********************************************************************************/

  //cortexConfig.directive('ionAlphaScroll', ionAlphaScroll)
  /***********************************************************************************/
  /***********************************************************************************/

  /**********************************************************************************/
  /**********************COMMON CODE For all applications****************************/
  /**********************************************************************************/
  /*cortexConfig.config(['$httpProvider', function($httpProvider) {
          $httpProvider.defaults.useXDomain = true;
          delete $httpProvider.defaults.headers.common['X-Requested-With'];
              }]);    
  cortexConfig.config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('LS-cortexConfig');
  }]);
  /**********************************************************************************/
  /**********************************************************************************/

  cortexConfig.config(function($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
          // Allow same origin resource loads.
          'self',
          // Allow loading from our assets domain.  Notice the difference between * and **.
          'https://www.youtube.com/**',
          'https://devapi.scte.org/**'
      ]);

      // The blacklist overrides the whitelist so the open redirect here is blocked.
      $sceDelegateProvider.resourceUrlBlacklist([
          'http://myapp.example.com/clickThru**'
      ]);
  });

  cortexConfig.run(function($ionicPopup) {

      //     console.log("in wathcer..")
      //     console.log(JSON.stringify(deploy));
    //   deploy.watch().then(function() {}, function() {}, function(updateAvailable) {
    //       console.log("updateAvailable.." + updateAvailable);
    //       if (updateAvailable) {
    //           deploy.download().then(function() {
    //               deploy.extract().then(function() {
    //                   deploy.unwatch();
    //                   deploy.load();
    //               });
    //           });
    //       }
    //   });
  });
