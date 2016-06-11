/**
 * Created by leyiqiang on 5/29/16.
 */
(function(){
    angular
        .module("StillAliveAppMaker")
        .controller("MainController", MainController)
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController);

    function MainController($routeParams, UserService) {

    }

    function LoginController($location, UserService) {

        var vm = this;
        vm.login =  Login;

        function init() {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-full-width",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "1000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
        }

        init();
        function Login(username, password, $routeParams) {
            UserService
                .findUserByUsernameAndPassword(username,password)
                .then(function (res) {
                    var user = res.data;
                    if (user) {
                        var id = user._id;
                        $location.url("/profile/"+id);
                    } else {
                        toastr.error('User Not Found');
                    }
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.checkDupUser = checkDupUser;
        function init() {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-full-width",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "1000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
        }

        init();

        function checkDupUser(username, password){
            UserService
                .findUserByUsername(username)
                .then(function (res){
                    var user = res.data;
                    if(user != null || username == null || username=="") {
                        $location.url("/register/");
                        toastr.error("Illegal username, password");
                    } else {
                        var newUser =  {
                            _id:(new Date()).getTime(),
                            username:username,
                            password:password,
                            firstname:"",
                            lastName:"",
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