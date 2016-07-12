var  dictionaryCtrl =  ['$scope', '$state', '$rootScope', '$ionicLoading', '$ionicPopover', '$stateParams','Utils', '$localStorage', function($scope,$state, $rootScope, $ionicLoading, $ionicPopover, $stateParams,Utils,$localStorage){
    $scope.dictionarywords = [];
    $scope.dictionarywords = $localStorage['dictionarywords'];


	var template = '<style>.popover { height:180px; width: 180px; }</style>' + 
	'<ion-popover-view>' + 
  '<ion-content>' +
  '<div class="row">' +
  '<div class="col col-center">' +
  '<lable>' +
  '<spam class="descriptivetext"><b>Term:</b> {{popupitem.Term}}</spam>' +
  '</lable>' +
  '</div>' +
  '</div>' +
  '<div class="row">' +
  '<div class="col col-center">' +
  '<lable>' +
  '<spam class="descriptivetext"><b>Definition:</b> {{popupitem.Description2}}</spam>' +
  '</lable>' +
  '</div>' +
  '</div>' +
  '<div class="row">' +
  '<div class="col col-center">' +
  '<lable>' +
  '<spam class="descriptivetext"><b>Category:</b> {{popupitem.Category}}</spam>' +
  '</lable>' +
  '</div>' +
  '</div>' + 
  '</ion-content>' + 
  '</ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  $scope.openPopover = function($event,index) {

    // Not needed for demo, need to finalize the content with Kevin : Surojit
    //$scope.popupitem = $scope.dictionarywords[index];
    //$scope.popover.show($event);
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

   $scope.redirectDisover = function() {
     Utils.redirectDiscover();
   };

// Check if a state change happened

$scope.searchString = "";

$scope.myCustomFilter = function(item) 
{
  return anyNameStartsWith(item, $scope.searchString);
};

function anyNameStartsWith (item, searchword) {
  if (searchword === "")
    return true;

  var _word = item.Abbreviation.toLowerCase();
  var _description = item.Description.toLowerCase();
  var _searchword = searchword.toLowerCase();
  if (_word.indexOf(_searchword) != -1 || _description.indexOf(_searchword) != -1)
    return item;
};

$scope.$on('$stateChangeSuccess',
  function onStateSuccess(event, toState, toParams, fromState) {
      if($state.params.focusAlpha != 'all')
      {
        $scope.searchString = $state.params.focusAlpha;
        searchText = searchText.toLowerCase();
      }  
    }
    );

}];