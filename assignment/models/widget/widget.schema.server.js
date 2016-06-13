/**
 * Created by leyiqiang on 6/11/16.
 */
var mongoose = require("mongoose");

module.exports = function() {
    var WidgetSchema = mongoose.Schema( {
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
        widgetType: {type: String,
                    enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url:String,
        width:String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deleteable: Boolean,
        formatted: Boolean,
        order: Number,
        dateCreated: {type: Date, default: Date.now}
    }, {collection:"assignment.widget"});

    return WidgetSchema;
};