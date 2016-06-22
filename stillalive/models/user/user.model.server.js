/**
 * Created by leyiqiang on 6/21/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var connectionString = 'mongodb://localhost/stillalive';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    var connection = mongoose.createConnection(connectionString);

    var ClientSchema = require("./user.schema.server")();
    var Client = connection.model("Client", ClientSchema);


    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        findFacebookUser: findFacebookUser,
        deleteUser: deleteUser
    };

    return api;


    function createUser(user) {
        return Client.create(user);
    }

    function findUserByCredentials(username, password) {
        return Client.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return Client.findOne({username: username});
    }

    function findUserById(userId) {
        // User.find({_id:userId});
        return Client.findById(userId);
    }

    function updateUser(id, newUser) {
        return Client.update(
            {_id: id},
            {$set :
            {
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }

            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function findFacebookUser(id) {
        return User.findOne({'facebook.id':id});
    }
};