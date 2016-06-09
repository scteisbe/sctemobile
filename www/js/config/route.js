var appStates = {
	login :  {name: 'login', url: "/login", templateUrl:"templates/welcome/login.html", controller: 'loginCtrl'},
	tabdictionaryview :  {name: 'tab.dictionaryview', url: "/dictionaryview/:focusAlpha", views:{'tab-resource@tab':{templateUrl:"templates/dictionary/dictionaryview.html", controller: 'dictionaryCtrl'}}},
	tab :  {name: 'tab', url: "/tab", templateUrl:"templates/tabs.html", abstract: true},
	tabdiscover : {name:'tab.discover', url:'/discover', views:{'tab-discover@tab':{templateUrl:"templates/discover/discover.html", controller: 'DiscoverCtrl'}}},
	tabmyprofile : {name:'tab.myprofile', url:'/myprofile', views:{'tab-discover@tab':{templateUrl:"templates/discover/profile.html", controller: 'DiscoverCtrl'}}},
	tabsearchresult : {name:'tab.searchresults', url:'/discover/searchresults', views:{'tab-discover@tab':{templateUrl:"templates/discover/search-results.html", controller: 'SearchResultsCtrl'}}},
	
	tabmylearning : {name:'tab.mylearning', url:'/mylearning', views:{'tab-mylearning@tab':{templateUrl:"templates/mylearning/mylearning.html", controller: 'MyLearningCtrl'}}},
	tabmylearningcompleted : {name:'tab.mylearning.completed', parent:'tab.mylearning', url:'/completed', views:{'tab-mylearning':{templateUrl:"templates/mylearning/completed-course-and-module-list.html", controller: 'MyLearningCtrl'}}},
	tabmylearningallcourses : {name:'tab.mylearning.allcourses', parent:'tab.mylearning', url:'/allcourses', views:{'tab-mylearning':{templateUrl:"templates/mylearning/allcourses-course-and-module-list.html", controller: 'MyLearningCtrl'}}},
	
	tabmylearningmodal : {name:'tab.mylearningmodal', url:'/mylearning/modal', views:{'tab-mylearning@tab':{templateUrl:"templates/mylearning/modal.html", controller: 'MyLearningCtrl'}}},
	tabgamesviewmodal : {name:'tab.gamesViewModal', url:'/mylearning/games', views:{'tab-mylearning@tab':{templateUrl:"templates/mylearning/games.html", controller: 'MyLearningCtrl'}}},
	tabapplibrary : {name:'tab.applibrary', url:'/applibrary', views:{'tab-applibrary@tab':{templateUrl:"templates/applibrary/applibrary.html", controller: 'AppLibraryCtrl'}}},
	tabtechtips : {name:'tab.techtips', url:'/techtips', views:{'tab-techtips@tab':{templateUrl:"templates/techtips/techtips.html", controller: 'TechtipsCtrl'}}},
	tabdigitalleakage : {name:'tab.digitalleakage', url:'/digitalleakage', views:{'tab-techtips@tab':{templateUrl:"templates/techtips/digitalleakage.html", controller: 'TechtipsCtrl'}}},
	tabresourcesmyevents : {name:'tab.resourcesmyevents', url:'/myevents', views:{'tab-resource@tab':{templateUrl:"templates/resource/myevents.html", controller: 'ResourceCtrl'}}},
	
	tabresource : {name:'tab.resource', url:'/resource', views:{'tab-resource@tab':{templateUrl:"templates/resource/resource.html", controller: 'ResourceCtrl'}}},
    tabscteSTD : {name:'tabscteSTD', url:'/SCTE-STANDARDS', views:{'tab-resource@tab':{templateUrl:"templates/resource/SCTEstd.html", controller: 'ResourceCtrl'}}},
	tabresourcesmyeventslivelearning : {name:'tab.resourcesmyevents.livelearning', parent:'tab.resourcesmyevents', url:'/livelearning', views:{'tab-resource':{templateUrl:"templates/resource/livelearning.html", controller: 'ResourceCtrl'}}},
	tabresourcesmyeventsmychapter : {name:'tab.resourcesmyevents.mychapter', parent:'tab.resourcesmyevents', url:'/mychapter', views:{'tab-resource':{templateUrl:"templates/resource/mychapter.html", controller: 'ResourceCtrl'}}},
	tabresourcesmyeventsnationwideevents : {name:'tab.resourcesmyevents.nationwideevents', parent:'tab.resourcesmyevents', url:'/nationwideevents', views:{'tab-resource':{templateUrl:"templates/resource/nationwideevents.html", controller: 'ResourceCtrl'}}},


 };


 

var appRoute = ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

 	
	
	for(var state in appStates){
		$stateProvider.state(appStates[state])
		//$stateProvider.state('login')	
	}
	$urlRouterProvider.otherwise('login')
}];