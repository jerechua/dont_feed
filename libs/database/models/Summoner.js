var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var toLower = function(string) {
    return string.toLowerCase();
};

var summonerSchema = new Schema({

    internalName: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    acctId: {
        type: Number,
        required: true,
        unique: true,
    },

    profileIconId: {
        type: Number,
        required: true
    },

    revisionDate: {
        type: String,
        required: true
    },

    summonerLevel: {
        type: Number,
        required: true
    },


    summonerId: {
        type: Number,
        required: true,
    },

    region: {
        type: String,
        required: true
    },

    // TODO: handle cases of multiple account ids
    // ie. user changes name
    alias: {
        type: String,
        set: toLower
    },


});

module.exports = mongoose.model('Summoner', summonerSchema);