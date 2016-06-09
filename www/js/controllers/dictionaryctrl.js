var  dictionaryCtrl =  ['$scope', '$state', '$rootScope', '$ionicLoading', '$ionicPopover', '$stateParams', function($scope,$state, $rootScope, $ionicLoading, $ionicPopover, $stateParams){


	var template = '<style>.popover { height:180px; width: 180px; }</style>' + 
	'<ion-popover-view>' + 
  '<ion-content>' +
  '<div class="row">' +
  '<div class="col col-center">' +
  '<lable>' +
  '<spam class="descriptivetext"><b>Term:</b> Some Text</spam>' +
  '</lable>' +
  '</div>' +
  '</div>' +
  '<div class="row">' +
  '<div class="col col-center">' +
  '<lable>' +
  '<spam class="descriptivetext"><b>Definition:</b> Some long text comes here. test string ignore it.</spam>' +
  '</lable>' +
  '</div>' +
  '</div>' +
  '<div class="row">' +
  '<div class="col col-center">' +
  '<lable>' +
  '<spam class="descriptivetext"><b>Category:</b> Some Text</spam>' +
  '</lable>' +
  '</div>' +
  '</div>' + 
  '</ion-content>' + 
  '</ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };

   //Cleanup the popover when we're done with it!
   $scope.$on('$destroy', function() {
   	$scope.popover.remove();
   });

   // Execute action on hide popover
   $scope.$on('popover.hidden', function() {
      // Execute action
    });

   // Execute action on remove popover
   $scope.$on('popover.removed', function() {
      // Execute action
    });

// Check if a state change happened

$scope.searchString = "";

$scope.filteredItems = $rootScope.dictionarywords;

$scope.$on('$stateChangeSuccess',
  function onStateSuccess(event, toState, toParams, fromState) {
      //stuff
      //console.log($state.params.focusAlpha);
      if($state.params.focusAlpha != 'all')
      {
        var items = $scope.dictionarywords;
        var searchText = $state.params.focusAlpha;
        searchText = searchText.toLowerCase();
        var temp = [];
        for(var loopIndex = 0; loopIndex < items.length; loopIndex++) {
          var dictionary = items[loopIndex];
          var _word = dictionary.word.toLowerCase();
          if(_word.indexOf(searchText) === 0) {
            temp.push(dictionary);
          }
        }

        $scope.filteredItems = temp;
      }
      
    }
    );

$scope.searchTextDidChange = function() {

 var items = $scope.dictionarywords;
 var searchText = $scope.searchString.toLowerCase();
 var temp = [];

 for(var loopIndex = 0; loopIndex < items.length; loopIndex++) {

  var dictionary = items[loopIndex];

  var _word = dictionary.word.toLowerCase();
  var _description = dictionary.description.toLowerCase();

  if(_word.indexOf(searchText) != -1 || _description.indexOf(searchText) != -1) {

   temp.push(dictionary);
 }
}

$scope.filteredItems = temp;
}



$scope.btnBack = function(userName, password, rememberMe){

};

$scope.itemSelected= function()
{

};
}];