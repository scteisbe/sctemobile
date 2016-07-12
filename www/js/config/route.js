var appStates = {
    login: { name: 'login', url: "/login", templateUrl: "templates/welcome/login.html", controller: 'loginCtrl' },
    tabdictionaryview: { name: 'tab.dictionaryview', url: "/dictionaryview/:focusAlpha", views: { 'tab-resource@tab': { templateUrl: "templates/dictionary/dictionaryview.html", controller: 'dictionaryCtrl' } } },
    tab: { name: 'tab', url: "/tab", templateUrl: "templates/tabs.html", abstract: true,controller: 'loginCtrl'  },
    tabdiscover: { name: 'tab.discover', cache: false, url: '/discover', views: { 'tab-discover@tab': { templateUrl: "templates/discover/discover.html", controller: 'DiscoverCtrl' } } },
    tabmyprofile: { name: 'tab.myprofile', cache: false, url: '/myprofile', views: { 'tab-discover@tab': { templateUrl: "templates/discover/profile.html", controller: 'DiscoverCtrl' } } },
    tabsearchresult: { name: 'tab.searchresults', cache: false, url: '/discover/searchresults', views: { 'tab-discover@tab': { templateUrl: "templates/discover/search-results.html", controller: 'SearchResultsCtrl' } } },

    tabdiscoversmyevents: { name: 'tab.discoversmyevents', url: '/events', views: { 'tab-discover@tab': { templateUrl: "templates/discover/events.html", controller: 'DiscoverEventCtrl' } } },

    tabmylearning: { name: 'tab.mylearning', cache: false, url: '/mylearning', views: { 'tab-mylearning@tab': { templateUrl: "templates/mylearning/mylearning.html", controller: 'MyLearningCtrl' } } },
    tabmylearningcompleted: { name: 'tab.mylearning.completed', cache: false, parent: 'tab.mylearning', url: '/completed', views: { 'tab-mylearning': { templateUrl: "templates/mylearning/completed-course-and-module-list.html", controller: 'MyLearningCtrl' } } },
    tabmylearningallcourses: { name: 'tab.mylearning.allcourses', cache: false, parent: 'tab.mylearning', url: '/allcourses', views: { 'tab-mylearning': { templateUrl: "templates/mylearning/allcourses-course-and-module-list.html", controller: 'MyLearningCtrl' } } },

    tabmylearningmodal: { name: 'tab.mylearningmodal', cache: false, url: '/mylearning/modal/:id', views: { 'tab-mylearning@tab': { templateUrl: "templates/mylearning/modal.html", controller: 'MyLearningCtrl' } } },
    tabgamesviewmodal: { name: 'tab.gamesViewModal', cache: false, url: '/mylearning/games', views: { 'tab-mylearning@tab': { templateUrl: "templates/mylearning/games.html", controller: 'MyLearningCtrl' } } },
    tabapplibrary: { name: 'tab.applibrary', cache: false, url: '/applibrary', views: { 'tab-applibrary@tab': { templateUrl: "templates/applibrary/applibrary.html", controller: 'AppLibraryCtrl' } } },
    tabtechtips: { name: 'tab.techtips', url: '/techtips', views: { 'tab-techtips@tab': { templateUrl: "templates/techtips/techtips.html", controller: 'TechtipsCtrl' } } },
    tabtechtipsubmit: { name: 'tab.techtipsubmit', url: '/techtipsubmit', views: { 'tab-techtips@tab': { templateUrl: "templates/techtips/techtipsubmit.html", controller: 'TechtipsCtrl' } } },

    tabtechtipsleafcontent: { name: 'tab.techtipsleafcontent', cache: false, url: '/techtipsleafcontent', views: { 'tab-techtips@tab': { templateUrl: "templates/techtips/techtipsleafcontent.html", controller: 'TechtipsCtrlTitle' } } },

    tabresource: { name: 'tab.resource', cache: false, url: '/resource', views: { 'tab-resource@tab': { templateUrl: "templates/resource/resource.html", controller: 'ResourceCtrl' } } },
    // tabscteSTD : {name:'tab.scteSTD', url:'/SCTE-STANDARDS', views:{'tab-resource@tab':{templateUrl:"templates/resource/SCTEstd.html", controller: 'ResourceCtrl'}}},    
    tabscteSTD: { name: 'tab.resource.scteSTD', cache: false, url: '/SCTE-STANDARDS', views: { 'tab-resource@tab': { templateUrl: "templates/resource/SCTEstd.html", controller: 'ResourceCtrl' } } },
    tabwhitepaper: { name: 'tab.whitepaper', cache: false, url: '/whitepaper', views: { 'tab-resource@tab': { templateUrl: "templates/resource/whitepaper.html", controller: 'ResourceCtrl' } } },

    tabeventsdetails: { name: 'tab.eventsdetails', cache: false, url: '/events/eventsdetails/:id', views: { 'tab-discover@tab': { templateUrl: "templates/discover/events-details.html", controller: 'DiscoverEventsCtrl' } } },


};




var appRoute = ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {



    for (var state in appStates) {
        $stateProvider.state(appStates[state])
            //$stateProvider.state('login') 
    }
    $urlRouterProvider.otherwise('login')
}];
