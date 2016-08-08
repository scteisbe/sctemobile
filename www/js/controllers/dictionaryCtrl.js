var dictionaryCtrl = ['$scope', '$state', '$rootScope', '$ionicLoading', '$ionicPopover', '$stateParams', 'Utils', '$localStorage','AppConstants', function($scope, $state, $rootScope, $ionicLoading, $ionicPopover, $stateParams, Utils, $localStorage,AppConstants) {
    $scope.dictionarywords = [];
    $scope.filteredItems = [];
    $scope.dictionarywords = $localStorage['dictionarywords'];


    $scope.openPopover = function($event, index) {
        
        if($scope.popover != null)
            $scope.popover.remove();
         var template = '<style>.popover { height:160px; width: 180px; }</style>' +
            '<ion-popover-view class="dictionary-wrapper">' +
            '<ion-content>' +
            '<div class="row">' +
            '<div class="col col-center">' +
            '<lable>' +
            '<spam class="descriptivetext"><b>{{popupitem.Abbreviation}} : {{popupitem.Description}}</spam>' +
            '</lable>' +
            '</div>' +
            '</div>';
        
        var template_category =  '<div class="row">' +
            '<div class="col col-center">' +
            '<lable>' +
            '<spam class="descriptivetext"><b>Category:</b> {{popupitem.Category}}</spam>' +
            '</lable>' +
            '</div>' +
            '</div>';
       
        var template_footer =    '</ion-content>' + '</ion-popover-view>';
        
        $scope.popupitem = $scope.filteredItems[index];
            if($scope.popupitem.Category != null) {
            template = template + template_category;
        }
     
        template = template + template_footer;
        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });
        $scope.popover.show($event);
    };

    $scope.closePopover = function() {
        $scope.popover.remove();
    };

    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        if($scope.popover != null)
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

    $scope.myCustomFilter = function(item) {
        return anyNameStartsWith(item, $scope.searchString);
    };

   

    $scope.searchTextDidChange = function() {

        var items = $scope.dictionarywords;
        //$scope.filteredItems = [];
        var searchStringlower = $scope.searchString.toLowerCase();
        var temp = [];

        for (var loopIndex = 0; loopIndex < items.length; loopIndex++) {
            var dictionary = items[loopIndex];
            var _word = dictionary.Abbreviation.toLowerCase();
            var _desc = "";
            if(dictionary.Description != null)
                _desc = dictionary.Description.toLowerCase();
            if ((_word.indexOf(searchStringlower) != -1) || (_desc.indexOf(searchStringlower) != -1)) {
                temp.push(dictionary);
            }
        }
        $scope.filteredItems = temp;
    };

    $scope.$on('$stateChangeSuccess',
        function onStateSuccess(event, toState, toParams, fromState) {
            if ($state.params.focusAlpha != AppConstants.all) {
                var items = $scope.dictionarywords;
                $scope.searchString = $state.params.focusAlpha;
                var searchText = $state.params.focusAlpha;
                if(searchText != null)
                    searchText = searchText.toLowerCase();
                var temp = [];
                for (var loopIndex = 0; loopIndex < items.length; loopIndex++) {
                    var dictionary = items[loopIndex];
                    var _word = dictionary.Abbreviation.toLowerCase();
                    if (_word.indexOf(searchText) === 0) {
                        temp.push(dictionary);
                    }
                }

                $scope.filteredItems = temp;
            } else {
                $scope.filteredItems = $scope.dictionarywords;
            }

        }
    );

}];
