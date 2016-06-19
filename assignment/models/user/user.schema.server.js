/**
 * Created by leyiqiang on 6/6/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');


    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        facebook: {
            id: String,
            displayName: String
        },
        google: {
            id: String,
        },
        email: String,
        phone: String,
        websites: {type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
        dateCreate: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "assignment.user"});

    return UserSchema;
};