var express     = require('express'),
    params      = require('express-params'),
    http        = require('http'),
    request     = require('request'),
    jade        = require('jade');


var app         = express();

var database    = require('./libs/database'),
    Summoner    = database.Summoner,
    settings    = require('./libs/settings');


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
        region  = req.params.region[0],
        self    = this;

    Summoner.getOrCreateSummoner(name, region, function(err, summoner) {
        console.log(err);
        console.log(summoner);
        res.send(summoner);
    });


});

app.get('/', function(req, res) {
    res.render('index.jade');
});

app.listen(9999);
