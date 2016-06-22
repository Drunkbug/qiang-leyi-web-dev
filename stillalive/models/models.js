/**
 * Created by leyiqiang on 6/21/16.
 */
/**
 * Created by leyiqiang on 6/6/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.disconnect();

    var connectionString = 'mongodb://localhost/stillalive';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    mongoose.connect(connectionString);


    var userSaModel = require("./user/user.model.server.js")();
    var willSaModel = require("./will/will.model.server.js")();




    var models = {
        userModel: userSaModel,
        willModel: willSaModel
    };

    return models;
};