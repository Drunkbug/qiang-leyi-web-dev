/**
 * Created by leyiqiang on 6/11/16.
 */
var mongoose = require("mongoose");

module.exports = function () {
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        description: String,
        pages: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};