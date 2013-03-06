var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var settings = require('../../settings');

var feederNoobSchema = new Schema({

});

module.exports.apiUrl = function(name) {
    return settings.getSummonerUrl(name);
}

module.exports(mongoose.model('Feeder', feederNoobSchema));