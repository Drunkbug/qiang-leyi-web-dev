/**
 * Created by leyiqiang on 5/29/16.
 */
(function () {
    angular
        .module("StillAliveAppMaker")
        .factory("UserService", UserService);
    function UserService($http) {
        var api = {
            createUser: createUser,
            register: register,
            login: login,
            logout: logout,
            checkLoggedin: checkLoggedin,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById:findUserById,
            updateUser:updateUser,
            deleteUser:deleteUser,
            findUserByUsername:findUserByUsername,
        };
        return api;

        function checkLoggedin() {
            return $http.get("/api/sa/loggedin");
        }

        function logout() {
            return $http.post("/api/sa/logout");
        }

        function createUser(user) {
            var url = "/api/sa/user";
            var data = {
                user: user
            };

            return $http.post(url, data);
        }
        function deleteUser(id) {
            var url = "/api/sa/user/"+id;
            return $http.delete(url);
        }

        function findUserByUsername(username) {
            var url = "/api/sa/user?username="+username;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/api/sa/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function register(newUser) {
            var url = "/api/sa/register";
            var user = {
                username: newUser.username,
                password: newUser.password
            };

            return $http.post(url, user);
        }

        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/sa/user?username="+username+"&password="+password;
            return $http.get(url);
        }


        function findUserById(id) {
            var url = "/api/sa/user/"+id;
            return $http.get(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/sa/user/"+id;
            var data =  {
                id:id,
                newUser:newUser
            };
            return $http.put(url, data);
        }
    }

})();