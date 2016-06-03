/**
 * Created by leyiqiang on 5/29/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);


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
            var result = UserService.updateUser(vm.user._id, vm.user);
            if(result === true) {
                Materialize.toast("Success", 1000);
            } else {
                Materialize.toast("User Not Found", 1000);
            }
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
            var user = UserService.findUserByUsername(username);
            if(user || username == null ) {
                console.log("test");
                $location.url("/register/");
                Materialize.toast("Illegal username", 1000);
                return true;
            } else {
                var newUser =  {
                    _id:(new Date()).getTime(),
                    username:username,
                    password:password,
                    firstname:"",
                    lastName:""
                };
                UserService.createUser(newUser);
                $location.url("/profile/"+newUser._id);
            }
        }
    }
})();