var io          = require('socket.io').listen(5050);

var database    = require('./libs/database');

var Summoner    = database.Summoner;

io.set('log level', 1);
io.sockets.on('connection', function(socket) {
    console.log("Socket started on port 5050")

    var updateAllClients = function(data) {
        var data = {
            user: data
        }
        socket.emit('new:update', data);
    };

    var increasePoints = function(data, inc) {
        Summoner.increasePoints(data._id, inc, function(err, nAffected) {
            if (!err && nAffected > 0) {
                socket.emit('refresh:list');
            }
        });
    };

    socket.on('vote:up', function(data) { 
        // Want to increase feed points by 1
        
        var inc = { feed_points: 1 };

        increasePoints(data, inc);

    });

    socket.on('vote:down', function(data) {
        var inc = { pro_points: 1}
        increasePoints(data, inc);
    });

    socket.on("refresh:feeder:list", function(watchList) {

        Summoner.getSummonerBatch(watchList, function(err, updatedSummoners) {
            if (!err)
                socket.emit('new:feeder:list', updatedSummoners);
        });

    });

    socket.on('refresh:nonfeeder:list', function(watchList) {
        
        Summoner.getSummonerBatch(watchList, function(err, updatedSummoners) {
            if (!err)
                socket.emit('new:nonfeeder:list', updatedSummoners);
        });

    });

    socket.on('refresh:watch:list', function(watchList) {

        Summoner.getSummonerBatch(watchList, function(err, updatedSummoners) {
            if (!err)
                socket.emit('new:watch:list', updatedSummoners);
        });

    });

});