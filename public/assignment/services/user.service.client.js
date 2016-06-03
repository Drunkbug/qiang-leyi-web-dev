/**
 * Created by leyiqiang on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService($http) {
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
            var url = "http://localhost:3000/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }


        function findUserById(id) {
            var url = "/api/user/"+id;
            return $http.get(url);
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