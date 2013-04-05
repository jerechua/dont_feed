var dont_feed = angular.module('dont_feed', [], function($routeProvider, $locationProvider) {

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});

dont_feed.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});


dont_feed.directive('closeAlert', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.click(function(event) {
                $('#alertbox').addClass('animated fadeOutDown');
            });
        }
    };
});

dont_feed.directive('animateMe', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $('#alertbox').addClass('animated fadeInDown');
        }
    };
});