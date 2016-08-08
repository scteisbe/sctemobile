var appRoute = ['$stateProvider', '$urlRouterProvider', 'AppConstants', function($stateProvider, $urlRouterProvider, AppConstants) {

    var appStates = {
        login: { name: AppConstants.loginName, url: AppConstants.loginURL, templateUrl: AppConstants.loginPage, controller: AppConstants.loginCtrl },
        intro: { name: AppConstants.introName, url: AppConstants.introURL, templateUrl: AppConstants.introPage, controller: AppConstants.introCtrl },
        tabdictionaryview: { name: AppConstants.tabdictionaryviewName, url: AppConstants.tabdictionaryviewURL, views: { 'tab-resource@tab': { templateUrl: AppConstants.tabdictionaryviewPage, controller: AppConstants.tabdictionaryviewCtrl } } },
        tab: { name: AppConstants.tabName, url: AppConstants.tabURL, templateUrl: AppConstants.tabPage, abstract: true, controller: AppConstants.loginCtrl },
        tabdiscover: { name: AppConstants.tabdiscoverName, cache: false, url: AppConstants.tabdiscoverURL, views: { 'tab-discover@tab': { templateUrl: AppConstants.tabdiscoverPage, controller: AppConstants.tabdiscoverCtrl, title: AppConstants.discoverTitle } }, changeColor: true },
        tabsearchresult: { name: AppConstants.tabsearchresultName, cache: false, url: AppConstants.tabsearchresultURL, views: { 'tab-discover@tab': { templateUrl: AppConstants.tabsearchresultPage, controller: AppConstants.tabsearchresultCtrl } } },

        tabdiscoversmyevents: { name: AppConstants.tabdiscoversmyEvents, url: AppConstants.tabdiscoversmyeventsURL, views: { 'tab-discover@tab': { templateUrl: AppConstants.tabdiscoversmyeventsPage, controller: AppConstants.tabdiscoversmyeventsCtrl, title: AppConstants.eventsTitle } } },
        tabrssfeeds: { name: AppConstants.tabrssfeedsName, url: AppConstants.tabrssfeedsURL, views: { 'tab-discover@tab': { templateUrl: AppConstants.tabrssfeedsPage, controller: AppConstants.tabdiscoverCtrl, title: AppConstants.discoverTitle } } },
        tabncta: { name: AppConstants.tabnctaName, url: AppConstants.tabnctaURL, views: { 'tab-discover@tab': { templateUrl: AppConstants.tabnctaPage, controller: AppConstants.tabdiscoverCtrl, title: AppConstants.nctaTitle } } },

        tabmylearning: { name: AppConstants.tabmylearningName, cache: false, url: AppConstants.tabmylearningURL, views: { 'tab-mylearning@tab': { templateUrl: AppConstants.tabmylearningPage, controller: AppConstants.tabmylearningCtrl, title: AppConstants.myLearningTitle } } },
        tabmylearningcompleted: { name: AppConstants.tabmylearningcompletedName, cache: false, parent: AppConstants.mylearningParent, url: AppConstants.tabmylearningcompletedURL, views: { 'tab-mylearning': { templateUrl: AppConstants.tabmylearningcompletedPage, controller: AppConstants.tabmylearningCtrl } } },
        tabmylearningallcourses: { name: AppConstants.tabmylearningallcoursesName, cache: false, parent: AppConstants.mylearningParent, url: AppConstants.tabmylearningallcoursesURL, views: { 'tab-mylearning': { templateUrl: AppConstants.tabmylearningallcoursesPage, controller: AppConstants.tabmylearningCtrl } } },

        tabgamesviewmodal: { name: AppConstants.tabgamesviewmodalName, cache: false, url: AppConstants.tabgamesviewmodalURL, views: { 'tab-mylearning@tab': { templateUrl: AppConstants.tabgamesviewmodalPage, controller: AppConstants.tabmylearningCtrl } } },
        tabapplibrary: { name: AppConstants.tabapplibraryName, cache: false, url: AppConstants.tabapplibraryURL, views: { 'tab-applibrary@tab': { templateUrl: AppConstants.tabapplibraryPage, controller: AppConstants.tabapplibraryCtrl, title: AppConstants.appLibraryTitle } } },
        tabtechtips: { name: AppConstants.tabtechtipsName, url: AppConstants.tabtechtipsURL, cache: false, views: { 'tab-techtips@tab': { templateUrl: AppConstants.tabtechtipsPage, controller: AppConstants.tabtechtipsCtrl, title: AppConstants.techTipTitle } } },
        tabtechtipsubmit: { name: AppConstants.tabtechtipsubmitName, url: AppConstants.tabtechtipsubmitURL, views: { 'tab-techtips@tab': { templateUrl: AppConstants.tabtechtipsubmitPage, controller: AppConstants.tabtechtipsCtrl } } },

        tabtechtipsleafcontent: { name: AppConstants.tabtechtipsleafcontentName, cache: false, url: AppConstants.tabtechtipsleafcontentURL, views: { 'tab-techtips@tab': { templateUrl: AppConstants.tabtechtipsleafcontentPage, controller: AppConstants.tabtechtipsleafcontentCtrl } } },

        tabresource: { name: AppConstants.tabresourceName, cache: false, url: AppConstants.tabresourceURL, views: { 'tab-resource@tab': { templateUrl: AppConstants.tabresourcePage, controller: AppConstants.tabresourceCtrl, title: AppConstants.resourcesTitle } } },
        tabscteSTD: { name: AppConstants.tabscteSTDName, cache: false, url: AppConstants.tabscteSTDURL, views: { 'tab-resource@tab': { templateUrl: AppConstants.tabscteSTDPage, controller: AppConstants.tabresourceCtrl } } },
        tabwhitepaper: { name: AppConstants.tabwhitepaperName, cache: false, url: AppConstants.tabwhitepaperURL, views: { 'tab-resource@tab': { templateUrl: AppConstants.tabwhitepaperPage, controller: AppConstants.tabresourceCtrl } } },
        tabarchivedwebinars: { name: AppConstants.tabarchivedwebinarsName, cache: false, url: AppConstants.tabarchivedwebinarsURL, views: { 'tab-resource@tab': { templateUrl: AppConstants.tabarchivedwebinarsPage, controller: AppConstants.tabresourceCtrl } } },

        tabeventsdetails: { name: AppConstants.tabeventsdetailsName, cache: false, url: AppConstants.tabeventsdetailsURL, views: { 'tab-discover@tab': { templateUrl: AppConstants.tabeventsdetailsPage, controller: AppConstants.tabeventsdetailsCtrl } } },


    };

    for (var state in appStates) {
        $stateProvider.state(appStates[state])
            //$stateProvider.state('login') 
    }

    var authTok = window.localStorage['ngStorage-authToken'];
    if (authTok != null) {
        if(window.localStorage['ngStorage-noIntro'] == null){
            $urlRouterProvider.otherwise(AppConstants.introName)
        }else{
            $urlRouterProvider.otherwise(AppConstants.tabDiscoverURLSub)
        }
    } else {
        $urlRouterProvider.otherwise(AppConstants.loginName)
    }
}];
