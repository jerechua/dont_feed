//TODO: Refactor this whole crap

var API_URL = "http://api.elophant.com/v2/";
var ELOPHANT_API_KEY = "d6XkzdDzc4hz7cLG4Miw";


//TODO: Move this someplace where it makes more sense

var appendApiKey = function(url) {
    return url + "?key=" + ELOPHANT_API_KEY;
}

/*
    For items/champions

    resource refers to:
    http://api.elophant.com/v2/<resource>?key=<key>
 */
exports.getStaticResourceUrl = function(resource) {
    return appendApiKey(API_URL +  resource);
};

/*
    For summoner

    resource refers to:
    http://api.elophant.com/v2/<region>/summoner/<summoner_name>
 */
exports.getSummonerUrl = function(name, region) {
    return appendApiKey(API_URL + region + "/summoner/" + name);
};


exports.getApiUrl = function() {
    return API_URL;
};

exports.getRegion = function() {
    return REGION;
};

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
exports.getMongoUri = function() {

    var mongo_stub = "mongodb://",
        stream = 'dev';

    return mongo_stub + 
    MONGO[stream]['user'] +
    ":" + MONGO[stream]['pwd'] + 
    "@" + MONGO[stream]['uri'] +
    ":" + MONGO[stream]['port'] +
    "/" + MONGO[stream]['db_name'];

};