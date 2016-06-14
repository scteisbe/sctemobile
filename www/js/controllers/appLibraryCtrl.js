var AppLibraryCtrl = ['$scope', '$state', '$rootScope','Utils','$localstorage', function($scope, $state, $rootScope,Utils,$localstorage) {
    $scope.staticContent = [];
    $scope.androidPlatform = [];
    $scope.iosPlatform = [];
    $scope.platform = ionic.Platform.platform();
    $scope.staticContent['apps'] = $localstorage.getObject('staticcontent.apps');
    $scope.appList = $scope.staticContent['apps'];

//     $scope.category1 = [{
//     "os": "android",
//     "type": "separator",
//     "title": "Content 1",
//     "description": "",
//     "company": "",
//     "identifier": "",
//     "url": "img/batman_applibrary.jpg"
// }, {
//     "os": "android",
//     "type": "app",
//     "title": "cCalc",
//     "description": "Calculating tools for enterprise or wireless network. Log measurements, exchange projects between users, define and save configurations, export data.",
//     "company": "CommScope",
//     "identifier": "com.commscope.cCalc",
// "url": "img/batman_applibrary.jpg"}, {
//     "os": "android",
//     "type": "separator",
//     "title": "Content 2",
//     "description": "",
//     "company": "",
//     "identifier": "",
// "url": "img/batman_applibrary.jpg"}, {
//     "os": "android",
//     "type": "app",
//     "title": "Voltage Drop / Cable Size Calc",
//     "description": "Corrects for soil, thermal, depth, etc. AWG and metric.",
//     "company": "ElectroMission",
//     "identifier": "com.electromission.cable",
// "url": "img/batman_applibrary.jpg"
// }, {
//     "os": "android",
//     "type": "app",
//     "title": "Electrical Wiring Lite",
//     "description": "Sizing, load, voltage drop calculator.",
//     "company": "Intineo",
//     "identifier": "com.intineo.android.electricalprolite",
// "url": "img/batman_applibrary.jpg"}, {
//     "os": "android",
//     "type": "app",
//     "title": "Wire Calc",
//     "description": "Calculate the electrical resistance or voltage drop of a wire or cable.",
//     "company": "Black Cat Systems",
//     "identifier": "com.blackcatsystems.wiregauge",
// "url": "img/batman_applibrary.jpg"}, {
//     "os": "android",
//     "type": "separator",
//     "title": "Content 3",
//     "description": "",
//     "company": "",
//     "identifier": "",
// "url": "img/batman_applibrary.jpg"}, {
//     "os": "android",
//     "type": "app",
//     "title": "Wifi Analyzer",
//     "description": "Shows the Wi-Fi channels around you and finds less crowded channels.",
//     "company": "farproc",
//     "identifier": "com.farproc.wifi.analyzer",
// "url": "img/batman_applibrary.jpg"}, {
//     "os": "android",
//     "type": "app",
//     "title": "WiFi Site Survey",
//     "description": "Wi-Fi site survey, performance assessment, scanner, and analyzer.",
//     "company": "WiTuners",
//     "identifier": "com.wituners.wificonsolelite",
// "url": "img/batman_applibrary.jpg"}, {
//     "os": "android",
//     "type": "app",
//     "title": "3G 4G WiFi Maps & Speed Test",
//     "description": "Map cellular coverage, find Wi-Fi hotspots, and test / improve reception.",
//     "company": "OpenSignal.com",
//     "identifier": "com.staircase3.opensignal",
// "url": "img/batman_applibrary.jpg"
// }
// ];

    $scope.redirectDisover = function() {
       Utils.redirectDiscover();
    };
    
    $scope.openPage = function(url) {
        window.open(url, '_system');
    };

}];
