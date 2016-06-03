/**
 * Created by leyiqiang on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        //
        // app.get("/allusers/:username", function(req,res) {
        //     var username = req.params['username'];
        //     for(var i in users) {
        //         if (users[i].username === username) {
        //             res.send(users[i]);
        //         }
        //     }
        //     //req.send(users)
        // });

        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById:findUserById,
            updateUser:updateUser,
            deleteUser:deleteUser,
            findUserByUsername:findUserByUsername
        };
        return api;

        function createUser(user) {
            users.push(user);
        }
        function deleteUser(id) {
            for (var i in users) {
                if (users[i].id === id) {
                    users.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username === username) {
                    flag = true;
                    return users[i];
                }
            }
            return null;
        }
        function findUserByUsernameAndPassword(username, password) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password) {
                    flag = true;
                    return users[i];
                }
            }
            return null;
        }


        function findUserById(id) {
            for(var i in users) {
                console.log("aaa"+users[i]._id)
                if(users[i]._id == id) {
                    return users[i];
                }
            }
            return null;
        }

        function updateUser(id, newUser) {
            for (var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }
    }
})();