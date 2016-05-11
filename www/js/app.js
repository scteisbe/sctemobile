// angular.module is a global place for creating, registering and retrieving Angular modules
// 'cortex' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'cortex.services' is found in services.js
// 'cortex.controllers' is found in controllers.js
angular.module('cortex', ['ionic', 
                          'cortex.controllers', 
                          'cortex.services', 
                          'cortex.directives', 
                          'ionic.contrib.ui.tinderCards', 
                          'ionic.utils',
                          'ngHolder',
                          'times.tabletop'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$ionicConfigProvider', function($ionicConfigProvider) {
   // force Android tabs to bottom
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
}])

.config(function($stateProvider, $urlRouterProvider, TabletopProvider) {
  TabletopProvider.setTabletopOptions({
    key: '1KTe0AcWPrApY8qOzTV_lJrftDxo0ZDRB7DYtzZfvFLY',
    simpleSheet: false
    });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  /*WELCOME*/
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'templates/welcome/intro.html',
      controller: 'DemoCtrl'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home/home.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.post', {
    url: '/post/:id',
    views: {
      'home': {
        templateUrl: 'templates/home/post.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.me', {
    url: '/me',
    views: {
      'me': {
        templateUrl: 'templates/me/me.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.myprofile', {
    url: '/myprofile',
    views: {
      'me': {
        templateUrl: 'templates/me/profile.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'me': {
        templateUrl: 'templates/me/settings.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.apps', {
    url: '/apps',
    views: {
      'apps': {
        templateUrl: 'templates/apps/apps.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.network', {
    url: '/network',
    views: {
      'network': {
        templateUrl: 'templates/network/network.html',
        controller: 'DemoCtrl'
      }
    }
  })

  .state('tab.search', {
    url: '/search',
    views: {
      'search': {
        templateUrl: 'templates/search/search.html',
        controller: 'DemoCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');

});
