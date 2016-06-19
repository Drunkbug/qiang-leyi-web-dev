/**
 * Created by leyiqiang on 6/2/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;

    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    // ];
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/register", register);
    app.post("/api/logout", logout);
    app.get("/api/loggedin", loggedin);
    app.get("/api/user",getUsers);
    app.get("/api/user/:userId",findUserById);
    app.post("/api/user",createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", authenticate, deleteUser);

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function authenticate(req, res) {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.send(403);
        }
    }


    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
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
                function(user){
                    done(null, user);
                },
                function(err){
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
                function(user) {
                    if(user.length != 0) {
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
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
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
        res.send(200);
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
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
                function(user) {
                    res.json(user);
                },
                function (err) {
                    res.status(403).send("Unable to login");
                }
            );
        // var flag = false;
        // for(var u in users) {
        //     if (users[u].username === username && users[u].password === password) {
        //         flag = true;
        //         res.json(users[u]);
        //     }
        // }
        // if(!flag) {
        //     res.json(null);
        // }

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
        // var flag = false;
        // for (var i in users) {
        //     if(userId == users[i]._id) {
        //         res.json(users[i]);
        //         flag = 1;
        //     }
        // }
        // if(!flag) {
        //     res.json(null);
        // }
    }

    function createUser(req, res) {
        var user = req.body.user;
        // users.push(user);
        // res.json(user);

        userModel
            .createUser(user)
            .then(
                function (user) {
                    res.json(user);
                },
                function(err) {
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
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to update User")
            });
        // var flag = false;
        // for (var i in users) {
        //     if(users[i]._id == id) {
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         flag = true;
        //         res.sendStatus(200);
        //
        //     }
        // }
        // if(!flag) {
        //     res.status(404).send("user not found");
        // }

    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(function(status) {
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to remove user");

            });
        // for (var i in users) {
        //     if (users[i].id === id) {
        //         users.splice(i,1);
        //         res.sendStatus(200);
        //     }
        // }
        // res.status(404).send("user not found");
    }
};