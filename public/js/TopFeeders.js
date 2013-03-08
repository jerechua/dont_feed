function TopFeeders($scope, $http) {
    $http({
        method: 'GET',
        url: '/feeders',
    }).
    success(function(data, status, headers, config) {
        $scope.feeders = data;

    }).
    error(function(data, status, headers, config) {
        console.log('error');
    });

    $http({
        method: 'GET',
        url: '/nonfeeders',
    }).
    success(function(data, status, headers, config) {
        $scope.nonFeeders = data;

    }).
    error(function(data, status, headers, config) {
        console.log('error');
    });

    $scope.addFeedPoints = function(feeder) {
        $feeder.feed_points += 1;
    }

    $scope.removeFeedPoints = function(feeder) {
        $feeder.pro_points += 1;
    }

}