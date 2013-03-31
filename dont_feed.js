var express     = require('express'),
    params      = require('express-params'),
    http        = require('http'),
    request     = require('request'),
    jade        = require('jade');
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

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

app.use(express.cookieParser('keyboard cat'));
app.use(express.session());
app.use(express.bodyParser());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    userModel.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function(username, password, done) {

    userModel.findOne({ username: username }, function(err, user){
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Unknown user ' + username });
        user.comparePassword(password, function(err, isMatch){
            if (err) return done(err);
            if (isMatch){
                console.log('User and password matches');
                return done(null, user);
            } else {
                console.log('Mismatch');
                return done(null, false, { message: 'Invalid password ' });
            }
        });
    });
    
}));

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
    res.render('index.jade', { user: req.user });
});

app.get('/login', function(req, res) {
    res.render('login.jade');
});

app.get('/register', function(req, res) {
    res.render('register.jade');
});

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if (!user) res.redirect('/login');
        req.logIn(user, function(err) {
            if (err) return next(err);
        });
        res.redirect('/');
    })(req, res, next);
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
            console.log(user.username + ' has been saved');
        });
        res.redirect('/login');
    } else {
        res.redirect('/register');
    }

});

app.listen(9999);


/**
 * Start the socket server
 */

var socketio = require('./dont_feed_socket');
