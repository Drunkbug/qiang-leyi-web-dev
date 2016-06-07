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
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById:findUserById,
            updateUser:updateUser,
            deleteUser:deleteUser,
            findUserByUsername:findUserByUsername
        };
        return api;

        function createUser(user) {
            var url = "/api/project/user";
            var data = {
                user: user
            };

            return $http.post(url, data);
        }
        function deleteUser(id) {
            var url = "/api/project/user/"+id;
            return $http.delete(url);
        }

        function findUserByUsername(username) {
            var url = "/api/project/user?username="+username;
            return $http.get(url);
        }
        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url);
        }


        function findUserById(id) {
            var url = "/api/project/user/"+id;
            return $http.get(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/project/user/"+id;
            var data =  {
                id:id,
                newUser:newUser
            };
            return $http.put(url, data);
        }
    }
})();