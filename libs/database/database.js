var mongoose = require('mongoose');

var MONGO = {
    dev: {
        user: "feedernoob",
        pwd: "this is a great passw0rd to use",
        uri: "linus.mongohq.com",
        port: "10055",
        db_name: "dont_feed",
    },
};


//Stream is dev
var getMongoUri = function() {

    var mongo_stub = "mongodb://",
        stream = 'dev';

    return mongo_stub + 
    MONGO[stream]['user'] +
    ":" + MONGO[stream]['pwd'] + 
    "@" + MONGO[stream]['uri'] +
    ":" + MONGO[stream]['port'] +
    "/" + MONGO[stream]['db_name'];

};

mongoose.connect(getMongoUri());

db = mongoose.connection;

db.once('open', function() {
    console.log('Connected to DB');
});