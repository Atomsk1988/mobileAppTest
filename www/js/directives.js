var app = angular.module('starter.directives', []);

app.directive('actionItem', function() {
  return {
    restrict: 'AE',
    replace: 'true',
    template:   '<li class="item item-icon-right" >'+
     	    	   '<a href="#/poiCard">{{val.properties.title}}</a>'+
			       '<i class="icon ion-chevron-right" data-index="{{key}}"></i>'+
			       '<span ng-show="itemIndex" class="badge badge-assertive">{{itemIndex}}</span>'+
			    '</li>',
	controller: function ($scope) {
        $scope.itemIndex = 0;
    },
	link: function(scope, elem, attrs) {//this should be compile?
		elem.bind('click', function(e){
			if(e.target.tagName=="I"){
				//Write  place into route & get index back
				
				point = scope.poiservice.getPOI($(e.target).attr('data-index'));
				

				scope.$apply(function() {
                    scope.itemIndex = scope.routes.setPoint(0,point);
                });
				
			}else if(e.target.tagName=="SPAN"){
				//hide counter
			}else{
				//Go to link
				console.log('getouttoinfopage')
				return false;
			}
		});
	}
  };
});