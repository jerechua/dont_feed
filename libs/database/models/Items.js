var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var settings = require('../../settings');

var itemSchema = new Schema({
    id : {
        type: ObjectId,
        requried: true
    }, 
    name: {
        type: String,
        required: true,
    },
    iconPath: {
        type: String
    }
});

module.exports.apiUrl = function() {
    return settings.getUrl('items');
}

module.exports(mongoose.model('Items', itemSchema));