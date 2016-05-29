/**
 * Created by leyiqiang on 5/29/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);


    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.updateUser = updateUser;
        var id = $routeParams["id"];
        var index = -1;
        function init() {
            vm.user = UserService.findUserById(id);
        }
        init();


        function updateUser() {
            var result = UserService.updateUser(vm.user._id, vm.user);
            if(result === true) {
                Materialize.toast("Success", 1000);
            } else {
                Materialize.toast("User Not Found", 1000);
            }
            // users[index].firstName = vm.user.firstName;
            // users[index].lastName = vm.user.lastName;
        }
    }
    function LoginController($location, UserService) {

        var vm = this;
        vm.login =  Login;
        function Login(username, password) {
            var user = UserService.findUserByUsernameAndPassword(username,password);
            if (user) {
                var id = user._id;
                $location.url("/profile/"+id);
            } else {
                Materialize.toast("User Not Found", 1000);
            }
        }
    }

})();