var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var championSchema = new Schema({

});

module.exports(mongoose.model('Champions', championSchema));