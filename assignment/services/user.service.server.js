/**
 * Created by leyiqiang on 6/2/16.
 */
module.exports = function(app) {
    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];
    app.get("/api/user",getUsers);
    app.get("/api/user/:userId",findUserById);


    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username);
        } else {
            res.send(users);
        }
    }


    function findUserByCredentials(username, password, res) {
        var flag = false;
        for(var u in users) {
            if (users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                flag = true;
            }
        }
        if(!flag) {
            res.send({});
        }

    }

    function findUserByUsername(username, res) {
        var flag = false;
        for(var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                flag = true;
            }
        }
        if(!flag) {
            res.send({});
        }

    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var flag = false;
        for (var i in users) {
            if(userId === users[i]._id) {
                res.send(users[i]);
                flag = true;
            }
        }
        if(!flag) {
            res.send({});
        }
    }
};