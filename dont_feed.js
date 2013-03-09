var express     = require('express'),
    params      = require('express-params'),
    http        = require('http'),
    request     = require('request'),
    jade        = require('jade');


var app         = express();

var database    = require('./libs/database'),
    settings    = require('./libs/settings');

var Summoner    = database.Summoner;

params.extend(app);

app.locals.pretty = true;
app.set('view engine', 'jade');

// Templates
app.set('views', __dirname + '/views');

// Public files
app.use('/public', express.static(__dirname + '/public'));

app.use(express.bodyParser());


app.param('name');
//TODO: Wrong usage?
app.param('region', /^(na|euw|eune|br)$/);
app.get('/:region/summoner/:name', function(req, res) {

    var name    = req.params.name,
        region  = req.params.region[0];

    Summoner.getOrCreateSummoner(name, region, function(err, summoner) {
        res.send(summoner);
    });


});

app.get('/feeders/:name', function() {
    var name    = req.params.name;

    Summoner.incFeeder(name, function(err, summoner) {

    });

});

app.get('/feeders', function(req, res) {

    Summoner.getFeeders(function(err, feeders) {
        if (!err) {
            res.send(feeders);
        } else {
            res.send(err);
        }
    });
});


app.get('./nonfeeders/:name', function(req, res) {

    Summoner.incNonFeeder
});
app.get('/nonfeeders', function(req, res) {

    Summoner.getNonFeeders(function(err, nonfeeder) {
        if (!err) {
            res.send(nonfeeder);
        } else {
            res.send(err);
        }
    });

});

app.get('/', function(req, res) {
    res.render('index.jade');
});

app.listen(9999);


/**
 * Start the socket server
 */

var socketio = require('./dont_feed_socket');