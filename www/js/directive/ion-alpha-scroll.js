var ionAlphaScroll = ['$ionicScrollDelegate', '$location', '$timeout', '$document', function ($ionicScrollDelegate, $location, $timeout, $document){
		return{
			require: '?ngModel',
			restrict: 'AE',
			replace: true,
			compile: function(tElement, tAttrs, tTransclude){
				var children = tElement.contents();
				var template = angular.element([
					'<ion-list class="ion_alpha_list_outer">',
						'<ion-scroll delegate-handle="alphaScroll">',
						'<div class="dic-title">DICTIONARY</div>',
							'<div data-ng-repeat="(letter, items) in sorted_items" class="ion_alpha_list">',
								'<ion-item class="item item-divider" id="index_{{letter}}">{{letter}}</ion-item>',
								'<ion-item ng-repeat="item in items"></ion-item>',
							'</div>',
						'</ion-scroll>',
						'<ul class="ion_alpha_sidebar">',
							'<li ng-click="alphaScrollGoToList(\'index_{{letter}}\')" ng-repeat="letter in alphabet">{{letter}}</li>',
						'</ul>',
					'</ion-list>'
					].join(''));

				var headerHeight = $document[0].body.querySelector('.bar-header').offsetHeight;
				var subHeaderHeight = 44//tAttrs.subheader === "true" ? 44 : 0;
				var tabHeight = $document[0].body.querySelector('.tab-nav') ? $document[0].body.querySelector('.tab-nav').offsetHeight : 0;
				var windowHeight = window.innerHeight;

				var contentHeight = windowHeight - headerHeight - subHeaderHeight - tabHeight;

				angular.element(template.find('ion-item')[1]).append(children);
				tElement.html('');
      			tElement.append(template);
			
      			tElement.find('ion-scroll').css({"height": contentHeight + 'px'});
      			var sliderHeight = angular.element(document.querySelector('div.list'))[0].offsetHeight;
      			var windowCenter = (windowHeight/2);
      			var startPoint = 88;
      			var isIOS = ionic.Platform.isIOS();
      			if(isIOS)
      			{
      				if (windowHeight < 500)
      				{
      					tElement.find('ul').css({"top":"1px"});
      					tElement.find('li').css({"line-height":"1.0"});
      					tElement.find('li').css({"font-size": "11px"});
      				}
      				if (windowHeight > 501 && windowHeight < 600)
      				{
      					tElement.find('ul').css({"top":'5px'});
      					tElement.find('li').css({"font-size": "10px"});
      					//tElement.find('li').css({"line-height": "1.3"});
      				} 
      				else if (windowHeight > 600 && windowHeight < 740)
      				{
      					tElement.find('ul').css({"top":"50px"});
      				}
      				else if (windowHeight > 741)
      				{
      					tElement.find('ul').css({"top":"100px"});
      					tElement.find('li').css({"line-height":"1.4"});
      					tElement.find('li').css({"font-size": "13px"});
      				}

      			}
      			else
      			{
      				startPoint = (windowCenter/2) - 15;
      				tElement.find('ul').css({"top": startPoint + 'px'});
      			} 
      			

				return function (scope, element, attrs, ngModel) {
					var count = 0;
					var scrollContainer = element.find('ion-scroll');

					var ionicScroll = scrollContainer.controller('$ionicScroll');

	                // do nothing if the model is not set
	                if (!ngModel) return;

	                ngModel.$render = function(){
						scope.items = [];                	
	                	scope.items = ngModel.$viewValue;
	                	scope.alphabet = iterateAlphabet();
		                var tmp={};
			            for(i=0;i<scope.items.length;i++){
			              var letter=scope.items[i][attrs.key].toUpperCase().charAt(0);
			              if( tmp[ letter] ==undefined){
			              tmp[ letter]=[]
			            }
			              tmp[ letter].push( scope.items[i] );
			            }
			            scope.sorted_items = tmp;

			            scope.alphaScrollGoToList = function(id){
				          $location.hash(id);
				          $ionicScrollDelegate.$getByHandle('alphaScroll').anchorScroll();
				        }

				        //Create alphabet object
				        function iterateAlphabet()
				        {
				           var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
				           var numbers = new Array();
				           for(var i=0; i<str.length; i++)
				           {
				              var nextChar = str.charAt(i);
				              numbers.push(nextChar);
				           }
				           return numbers;
				        }
				        scope.groups = [];
				        for (var i=0; i<10; i++) {
				          scope.groups[i] = {
				            name: i,
				            items: []
				          };
				          for (var j=0; j<3; j++) {
				            scope.groups[i].items.push(i + '-' + j);
				          }
				        }

	                };

	            }
	        }
        };
    }];