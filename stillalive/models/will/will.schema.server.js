/**
 * Created by leyiqiang on 6/21/16.
 */
var mongoose = require("mongoose");

module.exports = function () {
    var WillSchema = mongoose.Schema({
        _client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
        name: String,
        toWhom: String,
        toContact: String,
        description: String,
        widgetType: {
            type: String,
            enum: ['ACCOUNT', 'ITEM', 'LETTER', 'PICTURE', 'TEXT', 'OTHER']
        },
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "stillalive.will"});

    return WillSchema;
};