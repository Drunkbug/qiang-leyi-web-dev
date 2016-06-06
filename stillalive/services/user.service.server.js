/**
 * Created by leyiqiang on 6/2/16.
 */
module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email:""},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email:""},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email:""},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email:""}
    ];
    app.get("/api/user",getUsers);
    app.get("/api/user/:userId",findUserById);
    app.post("/api/user",createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.json(null);
        }
    }


    function findUserByCredentials(username, password, res) {
        var flag = false;
        for(var u in users) {
            if (users[u].username === username && users[u].password === password) {
                flag = true;
                res.json(users[u]);
            }
        }
        if(!flag) {
            res.json(null);
        }

    }

    function findUserByUsername(username, res) {
        var flag = false;
        for(var u in users) {
            if (users[u].username == username) {
                flag = true;
                res.json(users[u]);
            }
        }
        if(!flag) {
            res.json(null);
        }

    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var flag = false;
        for (var i in users) {
            if(userId == users[i]._id) {
                res.json(users[i]);
                flag = 1;
            }
        }
        if(!flag) {
            res.json(null);
        }
    }

    function createUser(req, res) {
        var user = req.body.user;
        users.push(user);
        res.json(user);
    }


    function updateUser(req, res) {
        var id = req.body.id;
        var newUser = req.body.newUser;
        var flag = false;
        for (var i in users) {
            if(users[i]._id == id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                flag = true;
                res.sendStatus(200);

            }
        }
        if(!flag) {
            res.status(404).send("user not found");
        }

    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        for (var i in users) {
            if (users[i].id === id) {
                users.splice(i,1);
                res.sendStatus(200);
            }
        }
        res.status(404).send("user not found");
    }
};