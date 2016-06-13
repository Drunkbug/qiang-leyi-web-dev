/**
 * Created by leyiqiang on 6/11/16.
 */
var mongoose = require("mongoose");

module.exports = function() {
    var PageSchema = mongoose.Schema({
        _website:{type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
        name: String,
        title: String,
        description: String,
        _widgets: {type: mongoose.Schema.Types.ObjectId, ref: 'Widget'},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.page"});
    return PageSchema;
};