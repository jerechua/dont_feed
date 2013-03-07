var mongoose    = require('mongoose'),
    request     = require('request');

var settings    = require('../settings');

mongoose.connect(settings.getMongoUri());

db = mongoose.connection;

db.once('open', function() {
    console.log('Connected to DB');
});


var summonerModel = require("./models/Summoner");

exports.Summoner = {

    getSummoner: function(name, region, callback) {
        var name = name.toLowerCase();
        var query = {
            "region" : region,
            "alias" : name
        };
        summonerModel.findOne(query, callback);
    },

    addSummonerNoCheck: function(summoner, region, callback) {
        summoner['alias'] = summoner.name;
        summoner['region'] = region;
        new summonerModel(summoner).save(callback);
    },

    addSummoner: function(summoner, region, callback) {
        this.getSummoner(summoner.name, region, function(err, summoner) {
            // Summoner does not exist in our db
            
            if (summoner == null) {
                this.addSummonerNoCheck(summoner, callback);
            } else {
                callback(err, summoner);
            }

        });
    },

    getOrCreateSummoner: function(name, region, callback) {
        var self = this;
        this.getSummoner(name, region, function(err, _summoner) {
            if (_summoner === null) {
                request.get(settings.getSummonerUrl(name, region), function(err, _res, body) {
                    var data = JSON.parse(body);
                    if (data.success == true) {
                        self.addSummonerNoCheck(data.data, region, callback);
                    } else {
                        callback(body, null);
                    }
                });
            } else {
                callback(err, _summoner);
            }
        });
    },

};