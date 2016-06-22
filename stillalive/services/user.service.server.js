/**
 * Created by leyiqiang on 6/2/16.
 */

var passport = require('passport');
passport.initialize();
passport.session();
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
// var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, models) {
    var userModel = models.userModel;
    // app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.post("/api/sa/login", passport.authenticate('saam'), login);
    app.post("/api/sa/register", register);
    app.post("/api/sa/logout", logout);
    app.get("/api/sa/loggedin", loggedin);
    app.get("/api/sa/user", getUsers);
    app.get("/api/sa/user/:userId", findUserById);
    app.post("/api/sa/user", createUser);
    app.put("/api/sa/user/:userId", updateUser);
    app.delete("/api/sa/user/:userId", authenticate, deleteUser);

    passport.use('saam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function authenticate(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send(403);
        }
    }


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user.username === username && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.status(400).send("Username already exist");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(password);
                        return userModel
                            .createUser(req.body);
                    }
                    // console.log("aaa"+user);
                    // res.sendStatus(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedin(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if (username && password) {
            findUserByCredentials(username, password, req, res);
        } else if (username) {
            findUserByUsername(username, req, res);
        } else {
            res.json(null);
        }
    }


    function findUserByCredentials(username, password, req, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(403).send("Unable to login");
                }
            );

    }

    function findUserByUsername(username, req, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body.user;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send("Illegal Username");
                }
            );
    }


    function updateUser(req, res) {
        var id = req.body.id;
        var newUser = req.body.newUser;
        userModel
            .updateUser(id, newUser)
            .then(function (user) {
                    res.json(newUser);
                },
                function (err) {
                    res.status(404).send("Unable to update User")
                });
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(404).send("Unable to remove user");

                });
    }

};