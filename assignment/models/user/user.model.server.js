/**
 * Created by leyiqiang on 6/6/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    // mongoose.connect('mongodb://localhost/assignment');
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);


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
        return User.create(user);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserById(userId) {
        // User.find({_id:userId});
        return User.findById(userId);
    }

    function updateUser(id, newUser) {
        return User.update(
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