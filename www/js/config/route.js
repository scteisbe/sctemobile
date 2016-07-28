var appStates = {
    login: { name: 'login', url: "/login", templateUrl: "templates/welcome/login.html", controller: 'loginCtrl' },
    intro: { name: 'intro', url: "/intro", templateUrl: "templates/welcome/intro.html", controller: 'introCtrl' },
    tabdictionaryview: { name: 'tab.dictionaryview', url: "/dictionaryview/:focusAlpha", views: { 'tab-resource@tab': { templateUrl: "templates/resource/dictionary.html", controller: 'dictionaryCtrl' } } },
    tab: { name: 'tab', url: "/tab", templateUrl: "templates/tabs.html", abstract: true, controller: 'loginCtrl' },
    tabdiscover: { name: 'tab.discover', cache: false, url: '/discover', views: { 'tab-discover@tab': { templateUrl: "templates/discover/discover.html", controller: 'DiscoverCtrl', title: 'Discover' } } },
    tabsearchresult: { name: 'tab.searchresults', cache: false, url: '/discover/searchresults', views: { 'tab-discover@tab': { templateUrl: "templates/discover/search-results.html", controller: 'SearchResultsCtrl' } } },

    tabdiscoversmyevents: { name: 'tab.discoversmyevents', url: '/events', views: { 'tab-discover@tab': { templateUrl: "templates/discover/events.html", controller: 'DiscoverEventCtrl', title: 'Events' } } },
    tabrssfeeds: { name: 'tab.rssfeeds', url: '/rss', views: { 'tab-discover@tab': { templateUrl: "templates/discover/rssfeeds.html", controller: 'DiscoverCtrl', title: 'Discover' } } },

    tabmylearning: { name: 'tab.mylearning', cache: false, url: '/mylearning', views: { 'tab-mylearning@tab': { templateUrl: "templates/mylearning/mylearning.html", controller: 'MyLearningCtrl', title: 'Mt Learning' } } },
    tabmylearningcompleted: { name: 'tab.mylearning.completed', cache: false, parent: 'tab.mylearning', url: '/completed', views: { 'tab-mylearning': { templateUrl: "templates/mylearning/completed-course-and-module-list.html", controller: 'MyLearningCtrl' } } },
    tabmylearningallcourses: { name: 'tab.mylearning.allcourses', cache: false, parent: 'tab.mylearning', url: '/allcourses', views: { 'tab-mylearning': { templateUrl: "templates/mylearning/allcourses-course-and-module-list.html", controller: 'MyLearningCtrl' } } },

    tabmylearningmodal: { name: 'tab.mylearningmodal', cache: false, url: '/mylearning/modal/:id', views: { 'tab-mylearning@tab': { templateUrl: "templates/mylearning/modal.html", controller: 'MyLearningCtrl' } } },
    tabgamesviewmodal: { name: 'tab.gamesViewModal', cache: false, url: '/mylearning/games', views: { 'tab-mylearning@tab': { templateUrl: "templates/mylearning/games.html", controller: 'MyLearningCtrl' } } },
    tabapplibrary: { name: 'tab.applibrary', cache: false, url: '/applibrary', views: { 'tab-applibrary@tab': { templateUrl: "templates/applibrary/app-library.html", controller: 'AppLibraryCtrl', title: 'App Library' } } },
    tabtechtips: { name: 'tab.techtips', url: '/techtips', cache: false, views: { 'tab-techtips@tab': { templateUrl: "templates/techtips/techtips.html", controller: 'TechtipsCtrl', title: 'Tech Tip' } } },
    tabtechtipsubmit: { name: 'tab.techtipsubmit', url: '/techtipsubmit', views: { 'tab-techtips@tab': { templateUrl: "templates/techtips/submit-techtip.html", controller: 'TechtipsCtrl' } } },

    tabtechtipsleafcontent: { name: 'tab.techtipsleafcontent', cache: false, url: '/techtipsleafcontent', views: { 'tab-techtips@tab': { templateUrl: "templates/techtips/techtip-content.html", controller: 'TechtipsCtrlTitle' } } },

    tabresource: { name: 'tab.resource', cache: false, url: '/resource', views: { 'tab-resource@tab': { templateUrl: "templates/resource/resource.html", controller: 'ResourceCtrl', title: 'Resources' } } },
    tabscteSTD: { name: 'tab.resource.scteSTD', cache: false, url: '/SCTE-STANDARDS', views: { 'tab-resource@tab': { templateUrl: "templates/resource/scte-standards.html", controller: 'ResourceCtrl' } } },
    tabwhitepaper: { name: 'tab.whitepaper', cache: false, url: '/whitepaper', views: { 'tab-resource@tab': { templateUrl: "templates/resource/whitepaper.html", controller: 'ResourceCtrl' } } },
    tabarchivedwebinars: { name: 'tab.archivedwebinars', cache: false, url: '/archivedwebinars', views: { 'tab-resource@tab': { templateUrl: "templates/resource/archivedwebinars.html", controller: 'ResourceCtrl' } } },

    tabeventsdetails: { name: 'tab.eventsdetails', cache: false, url: '/events/eventsdetails/:id', views: { 'tab-discover@tab': { templateUrl: "templates/discover/event-details.html", controller: 'DiscoverEventsDetailCtrl' } } },


};




var appRoute = ['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {



    for (var state in appStates) {
        $stateProvider.state(appStates[state])
            //$stateProvider.state('login') 
    }
    
    var authTok = window.localStorage['ngStorage-authToken'];
    if(authTok!= null){

     $urlRouterProvider.otherwise('tab/discover')
   }
    
    else{
        $urlRouterProvider.otherwise('login')
    }
}];
