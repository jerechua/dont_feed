var express     = require('express'),
    params      = require('express-params'),
    http        = require('http'),
    request     = require('request'),
    jade        = require('jade');
    mongoose    = require('mongoose');

var app         = express();

var database    = require('./libs/database'),
    settings    = require('./libs/settings'),
    User        = require('./libs/database/models/User');

var Summoner    = database.Summoner;
var userModel   = User.userModel;

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
        if (!err) {
            res.send(summoner);
        } else {
            res.send(null)
        }
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

app.get('/login', function(req, res) {
    res.render('login.jade');
});

app.get('/register', function(req, res) {
    res.render('register.jade');
});

// TODO: Implement login
app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    
});

app.post('/register', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var reentered_password = req.body.reenter_password;
    var email = req.body.email;
    var reentered_email = req.body.reenter_email;

    var isPwAndEmailSame = (password == reentered_password && email == reentered_email);

    if (isPwAndEmailSame) {
        var user = new userModel({
            username: username,
            password: password,
            email: email
        });
        user.save(function(err){
            console.log(user.username + ' has been saved with the password ' + user.password);
        });
    } else {
        res.redirect('/register');
    }

});

app.listen(9999);


/**
 * Start the socket server
 */

var socketio = require('./dont_feed_socket');
