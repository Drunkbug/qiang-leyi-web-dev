/**
 * Created by leyiqiang on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
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
            findUserByUsername:findUserByUsername
        };
        return api;

        function checkLoggedin() {
            return $http.get("/api/loggedin");
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function createUser(user) {
            var url = "/api/user";
            var data = {
                user: user
            };

            return $http.post(url, data);
        }
        function deleteUser(id) {
            var url = "/api/user/"+id;
            return $http.delete(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/api/login";
            var user = {
                username: username,
                password: password
            };

            return $http.post(url, user);
        }

        function register(newUser) {
            var url = "/api/register";
            var user = {
                username: newUser.username,
                password: newUser.password
            };

            return $http.post(url, user);
        }

        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }


        function findUserById(id) {
            var url = "/api/user/"+id;
            return $http.get(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/"+id;
            var data =  {
                id:id,
                newUser:newUser
            };
            return $http.put(url, data);
        }
    }
})();