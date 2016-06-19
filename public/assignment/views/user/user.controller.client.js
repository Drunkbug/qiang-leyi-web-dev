/**
 * Created by leyiqiang on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);


    function ProfileController($location, $rootScope, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        var id = $routeParams["id"];
        vm.user = $rootScope.currentUser;

        function init() {
            // UserService
            //     .findUserById(id)
            //     .then(function (res) {
            //     });
        }

        init();


        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(function (res) {
                    if (res.status === 200) {
                        Materialize.toast("Success", 1000);
                    } else {
                        Materialize.toast("User Not Found", 1000);
                    }
                });
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.user._id)
                .then(function (res) {
                    if (res.status === 200) {
                        Materialize.toast("Successfully Deleted", 1000);
                        $location.url("/login")
                    } else {
                        Materialize.toast("Unable to delete user", 1000);
                    }
                });
        }


        function logout() {
            $rootScope.currentUser = null;
            UserService
                .logout()
                .then(
                    function () {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }
    }

    function LoginController($location, UserService) {

        var vm = this;
        vm.login = Login;
        vm.checkUsername = true;
        vm.checkPwd = true;
        function Login(username, password) {
            if ((username == "" || username == undefined) && (password == "" || password == undefined)) {
                Materialize.toast("invalid username and password", 1000);
                $location.url("/login");
                vm.checkUsername = false;
                vm.checkPwd = false;

            }
            else if (username == "" || username == undefined) {
                Materialize.toast("invalid username", 1000);
                $location.url("/login");
                vm.checkUsername = false;
                vm.checkPwd = true;
            }
            else if (password == "" || password == undefined) {
                Materialize.toast("invalid password", 1000);
                $location.url("/login");
                vm.checkPwd = false;
                vm.checkUsername = true;
            } else {
                vm.checkUsername = true;
                vm.checkPwd = true;
                UserService
                    .login(username, password)
                    .then(function (res) {
                        var user = res.data;
                        if (user) {
                            var id = user._id;
                            $location.url("/profile/" + id);
                        } else {
                            Materialize.toast("User Not Found", 1000);
                        }
                    });
            }
        }
    }

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.checkDupUser = checkDupUser;
        vm.checkUsername = true;
        vm.dupPwd = true;
        function checkDupUser(username, password, cpwd) {
            var newUser = {
                username: username,
                password: password,
                firstname: "",
                lastName: ""
            };
            if ((username == "" || username == undefined)
                && ((password == "" || password == undefined)
                || (password != cpwd))) {
                vm.checkUsername = false;
                vm.dupPwd = false;
                Materialize.toast("invalid username and password", 1000);
            } else if((username == "" || username == undefined)) {
                vm.checkUsername = false;
                vm.dupPwd = true;
                Materialize.toast("invalid username", 1000);
            } else if((password == "" || password == undefined)
                || (password != cpwd)) {
                vm.checkUsername = true;
                vm.dupPwd = false;
                Materialize.toast("invalid password", 1000);
            } else {
                vm.checkUsername = true;
                vm.dupPwd = true;
                UserService
                    .register(newUser)
                    .then(function (res) {
                            var user = res.data;
                            $rootScope.currentUser = user;
                            $location.url("/profile/" + res.data._id);
                        },
                        function (err) {
                            $location.url("/register/");
                            Materialize.toast("Illegal username", 1000);
                        });
            }
            // UserService
            //     .findUserByUsername(username)
            //     .then(function (res){
            //         var user = res.data;
            //         if(user!= ""|| username == null || username=="" ) {
            //             $location.url("/register/");
            //             Materialize.toast("Illegal username", 1000);
            //         } else {
            //             var newUser =  {
            //                 username:username,
            //                 password:password,
            //                 firstname:"",
            //                 lastName:""
            //             };
            //             UserService
            //                 .register(newUser)
            //                 .then(function(res) {
            //                     $location.url("/profile/"+res.data._id);
            //                 });
            //
            //         }
            //     });

        }
    }
})();