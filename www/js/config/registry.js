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

  cortexConfig.run(['$rootScope', '$location', '$window', '$ionicPlatform', '$state', '$ionicPopup', '$localStorage', '$ionicHistory', 'Utils',
      function($rootScope, $location, $window, $ionicPlatform, $state, $ionicPopup, $localStorage, $ionicHistory, Utils) {
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

          // Send other Google Analytics (GA) events using this structure:
          //    ga('send', 'event', 'Search button', 'tap', 'from app library tab');
          // or
          //    ga('send', 'event', app.type, 'from app library', app.title);

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

          $ionicPlatform.on('resume', function() {
            Utils.scteSSO();
          });


      }
  ]);

  cortexConfig.run(['$ionicPlatform', 'StaticService', function($ionicPlatform, StaticService) {

      //Fetch the data
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
              // StatusBar.styleLightContent();
              StatusBar.styleDefault();
          }

      });
  }]);

  cortexConfig.run(['$ionicPlatform', '$ionicAnalytics', function($ionicPlatform, $ionicAnalytics) {
      $ionicPlatform.ready(function() {
          $ionicAnalytics.register({
              silent: true, // By default all analytics events are logged to the console for debugging. The silent flag disables this.
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
      /*** Inkling constants  ***/
      "inkLingDomainAddr": "inkling.com",
      "googlePlayStoreLink": "https://play.google.com/store/apps/details?id=com.inkling.android.axis&hl=en",
      "appleAppStoreLink": "https://itunes.apple.com/us/app/inkling-axis/id923550071?mt=8",
      "inkLingMessage": "This course material is available in the Inkling Axis app. Once you have it installed, you'll be able to read it there.",
      "inkLingtitle": " Inkling Axis :",
      /*** General constants  ***/
      "true":"true",
      "false":"false",
      "done": "Get Started",
      "cantReachServer": "Can't reach server",
      "noInternet": "Internet not available. Please check network connectivity.",
      "system": '_system',
      "searchServerErrorMsg": "Search request failed",
      "noData": "NO DATA AVAILABLE",
      /*** StatusCode constants  ***/
      "status105": 105,
      "status200": 200,
      "status401": 401,
      /*** Routing constants  ***/


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
      "tabmylearningURLSub": "tab/mylearning",
      "tabapplibraryURLSub": "tab/applibrary",
      "tabtechtipsURLSub": "tab/techtips",
      "tabresourceURLSub": "tab/resource",


      /*** Controller Names ***/
      "loginCtrl": "loginCtrl",
      "appCtrl": "appCtrl",
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

      /*** Google Analytics constants  ***/
      "send": "send",
      "set": 'set',
      "event": "event",
      "openExternalLink": "Opened an external link",
      "login": "Login",
      "searchButton": "Search button",
      "submitTechTipButton": "Submit TechTip button",
      "submitTechTip": "Submitted TechTip",
      "tap": "tapped",
      "submitted": "submitted",
      "promoBanner": 'Promo banner',
      "userId": 'userId',
      "fromAppLibraryTab": "from app library tab",
      "fromDiscoverTab": 'from discover tab',
      "fromFeaturedResourcesTab": 'from featured resources',
      "succeeded": "succeeded",
      "failed": "failed",

     
      /*** SearchCtrl constants  ***/
      "searchErrorMsg": "No Results Found",
      "searchFilterMessage": "No results available for the selection",
      /*** DiscoverCtrl constants  ***/
      "discoverNoInternet": "Internet not available. Please check network connectivity.",
      "discoverEventAddSuccess": "Event added Successfully",
      "discoverEventAddFail": "Event could not be added: ",
      "discoverEventsAlreadyAvailable": "Event is already added in your calendar.",
      "discoverErrorInCalendar": "Error in calendar.",
      "speakNow": "Please speak now",
      "enUS": "en-US",
      "informedURL": "http://www.cablelabs.com/news-events/blog",
      "nctaURL": "https://www.ncta.com/platform/",
      "recentSearchesPage": 'templates/discover/recent-searches.html',
      "UUID": "UUID : ",
      "datePattern": "HH:mm:ss",
      "startTime": "00:00:00",

      /*** DiscoverEventCtrl constants  ***/
      "relevantEvents": "relevantEvents",
      "liveLearnings": "liveLearnings",
      "nationalEvents": "nationalEvents",
      "nooverlay":"nooverlay",
      "overlayme":"overlayme",
      "eventhttp":"http",
      "eventhttpslash":"http://",
      "eventwww":"www",
      "eventhttpwww":"http://www.",
      "replaceliveLearnings":"LiveLearning: ",
      /*** IntroCtrl constants  ***/
      "introSkipIntro": "Get Started",
      /*** LoginCtrl constants  ***/
      "loginMissingInputData": "Wrong username or password",
      "wrongUserNamePassword": "Wrong username or password",
      "userNotMember": "Access to CORTEX Mobile is a benefit provided exclusively to SCTE/ISBE members. To use CORTEX Mobile, become a member at scte.org.",
      "joinScteLink":'http://www.scte.org/SCTE/Join/FastForms/CreateAccount.aspx',
      "forgotPasswordLink":'https://www.scte.org/SCTE/Sign_In.aspx',
      /*** DictionaryCtrl constants  ***/
      "dictionarySearchAcronym": "Browse cable industry abbreviations and terms.",
      "all": 'all',
      /*** StaticCtrl constants  ***/
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
  });
