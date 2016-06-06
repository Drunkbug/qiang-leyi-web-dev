/**
 * Created by leyiqiang on 6/6/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/assignment');
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);


    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;


    function createUser(user) {
        return User.create(user);
    }

    function findUserByCredentials() {

    }

    function findUserByUsername(username) {
        return User.find({username: username});
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function updateUser() {

    }

    function deleteUser() {

    }
};