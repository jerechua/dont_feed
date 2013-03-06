var express     = require('express'),
    jade        = require('jade');


var app         = express();

var database    = require('./libs/database');

app.locals.pretty = true;
app.set('view engine', 'jade');

// Templates
app.set('views', __dirname + '/views');

// Public files
app.use('/public', express.static(__dirname + '/public'));

app.use(express.bodyParser());

app.get('/', function(req, res) {
    res.render('index.jade');
});

app.listen(9999);
