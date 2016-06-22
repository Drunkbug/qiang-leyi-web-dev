/**
 * Created by leyiqiang on 6/21/16.
 */
var mongoose = require("mongoose");
module.exports = function () {
    var WillSchema = require("./will.schema.server")();
    var connectionString = 'mongodb://localhost/stillalive';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    var connection = mongoose.createConnection(connectionString);
    var Will = connection.model("Will", WillSchema);


    var api = {
        findWillsForUser: findWillsForUser,
        createWill: createWill,
        findWillById: findWillById,
        updateWill: updateWill,
        deleteWill: deleteWill

    };
    return api;

    function findWillsForUser(userId) {
        return Will.find({_user: userId});
    }

    function createWill(userId, will) {
        will._user = userId;
        return Will.create(will);
    }

    function findWillById(willId) {
        return Will.findOne({_id: willId});

    }

    function updateWill(willId, will) {
        return Will.update(
            {_id: willId},
            {
                $set: {
                    name: will.name,
                    description: will.description
                }
            });

    }

    function deleteWill(willId) {
        return Will.remove({_id: willId});
    }
};