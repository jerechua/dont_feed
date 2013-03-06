var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var summonerSchema = new Schema({

});

module.exports(mongoose.model('Summoner', summonerSchema));