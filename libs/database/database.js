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

    getSummonerByAcctId: function(id, callback) {
        summonerModel.findOne({acctId: id}, callback);
    },

    increasePoints: function(id, data, callback) {
        var update = {$inc: data};
        var query = {acctId: id};
        summonerModel.update(query, update, callback);
    },

    getSummonerBatch: function(summonerIds, callback) {
        summonerModel.find({acctId: {$in: summonerIds}}, callback);
    },



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

    // So very messy.. clean this up later
    getFeeders: function(callback) {

        summonerModel.aggregate(
        {
            $project: {
                pro_points: 1,
                feed_points: 1,
                acctId: 1,
                name: 1,
                region: 1,
                points: { 
                    $subtract: ['$feed_points', '$pro_points']
                }
            },
        }, 
        {
            $sort: {points: -1}
        },
        {
            $limit: 7
        }, callback);
    },

    getNonFeeders: function(callback) {
        summonerModel.aggregate(
        {
            $project: {
                pro_points: 1,
                feed_points: 1,
                acctId: 1,
                name: 1,
                region: 1,
                points: { 
                    $subtract: ['$feed_points', '$pro_points']
                }
            },
        }, 
        {
            $sort: {points: 1}
        },
        {
            $limit: 7
        }, callback);
    }

};