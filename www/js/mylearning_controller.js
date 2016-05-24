(function() {
angular.module('cortex')
.controller('MyLearningController', ['$scope', MyLearningController])
  function MyLearningController($scope) {
    $scope.openPage = function(url) {
      window.open(url, '_system');
    };

    $scope.groups = [];
    for (var i=0; i<7; i++) {
      $scope.groups[i] = {
        name: i + 1,
        items: []
      };
      for (var j=0; j<3; j++) {
        $scope.groups[i].items.push(" Course " + (i+1) + ', Module ' + (j+1));
      }
    }

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

  }
})();
