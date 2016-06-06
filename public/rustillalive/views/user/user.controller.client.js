/**
 * Created by leyiqiang on 5/29/16.
 */
(function(){
    angular
        .module("RUSAMaker")
        .controller("MainController", MainController)
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);
    
    function MainController($routeParams, UserService) {

    }
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams["id"];
        function init() {
            UserService
                .findUserById(id)
                .then(function (res) {
                    vm.user = res.data;
                });
        }
        init();


        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(function(res){
                    if(res.status === 200) {
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
                    
                });
        }
    }
    function LoginController($location, UserService) {

        var vm = this;
        vm.login =  Login;
        function Login(username, password) {
            UserService
                .findUserByUsernameAndPassword(username,password)
                .then(function (res) {
                    var user = res.data;
                    if (user) {
                        var id = user._id;
                        $location.url("/profile/"+id);
                    } else {
                        Materialize.toast("User Not Found", 1000);
                    }
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.checkDupUser = checkDupUser;
        function checkDupUser(username, password){
            UserService
                .findUserByUsername(username)
                .then(function (res){
                    var user = res.data;
                    if(user != null || username == null || username=="" ) {
                        $location.url("/register/");
                        Materialize.toast("Illegal username", 1000);
                    } else {
                        var newUser =  {
                            _id:(new Date()).getTime(),
                            username:username,
                            password:password,
                            firstname:"",
                            lastName:""
                        };
                        UserService
                            .createUser(newUser)
                            .then(function(res) {
                                $location.url("/profile/"+newUser._id);
                            });

                    }
                });

        }
    }
})();