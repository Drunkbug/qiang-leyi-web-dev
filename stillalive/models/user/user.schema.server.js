/**
 * Created by leyiqiang on 6/21/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');


    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        emergencyContact: String,
        emergencyPhone: String,
        Will: {type: mongoose.Schema.Types.ObjectId, ref: 'Will'},
        dateCreate: {type: Date, default: Date.now},
        checkinDate:{type: Date},
        dateUpdated: Date
    }, {collection: "stillalive.user"});

    return UserSchema;
};