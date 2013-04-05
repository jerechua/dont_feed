function TopFeeders($scope, $http) {

    var socket = io.connect(window.location.protocol + "//" + window.location.hostname + ":5050");

    var generateIds = function(summoners) {
        var ids = [];
        _.each(summoners, function(summoner) {
            ids.push(summoner.acctId);
        });
        return ids;
    };

    //TODO: this can probably consolidated into one
    socket.on('new:feeder:list', function(data) {
        $scope.feeders = data;
        $scope.$digest();
    });

    socket.on('new:nonfeeder:list', function(data) {
        $scope.nonFeeders = data;
        $scope.$digest();
    });

    socket.on('new:watch:list', function(data) {
        $scope.watchList = data;
        $scope.$digest();
    });


    socket.on('refresh:list', function() {
        socket.emit('refresh:feeder:list', generateIds($scope.feeders));
        socket.emit('refresh:nonfeeder:list', generateIds($scope.nonFeeders));
        socket.emit('refresh:watch:list', generateIds($scope.watchList))

    });

    $scope.fetchNonFeeders = function() {
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
    }

    $scope.fetchFeeders = function() {
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
    }

    $scope.addFeedPoints = function(feeder) {
        socket.emit('vote:up', {_id: feeder.acctId});
    }

    $scope.removeFeedPoints = function(feeder) {
        socket.emit('vote:down', {_id: feeder.acctId});
    }

    $scope.watchSummoner = function() {
        // Need to add region selection
        var url = "/na/summoner/" + $scope.summonerName;
        $http({
            method: 'GET',
            url: url,
        }).
        success(function(data, status, headers, config) { 

            if (data) {
                $scope.watchList.push(data);
                $scope.alertOptions = alertSuccess;
            } else {
                $scope.alertOptions = alertError;
            }

            // $('#alertbox').removeClass('animated fadeOutDown fadeInDown');
            // $('#alertbox').addClass('fadeInDown');


        }).
        error(function(data, status, headers, config) {
            console.log('error');
        });
    }


    /**
     * Initialization stuff
     */
    
    $scope.fetchNonFeeders();
    $scope.fetchFeeders();
    $scope.watchList = [];
    var alertError = {
        type: "alert",
        message: "Could not find summoner"
    };

    var alertSuccess = {
        type: "success",
        message: "Successfully added summoner to watch list"
    };

    $scope.alertOptions = {
        type: "secondary",
        message: "There are no summoners in your watch list yet!"
    }

}