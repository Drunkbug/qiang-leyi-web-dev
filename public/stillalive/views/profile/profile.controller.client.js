/**
 * Created by leyiqiang on 6/6/16.
 */
(function() {
    angular
        .module("StillAliveAppMaker")
        .controller("ProfileController", ProfileController)
        .controller("ConnectionController", ConnectionController)
        .controller("SettingController", SettingController);



    function ConnectionController($location, UserService) {
        var vm = this;
        // vm.checkDupUser = checkDupUser;
        // var id = $routeParams["id"];
        function init() {
            // UserService
            //     .findUserById(id)
            //     .then(function (res) {
            //         vm.user = res.data;
            //     });
        }

        init();

        // UserService
        //     .findUserByUsername(username)
        //     .then(function (res){
        //         var user = res.data;
        //         if(user != null || username == null || username=="") {
        //             $location.url("/register/");
        //             toastr.error("Illegal username, password");
        //         } else {
        //             var newUser =  {
        //                 _id:(new Date()).getTime(),
        //                 username:username,
        //                 password:password,
        //                 firstname:"",
        //                 lastName:"",
        //             };
        //             UserService
        //                 .createUser(newUser)
        //                 .then(function(res) {
        //                     $location.url("/profile/"+newUser._id);
        //                 });
        //
        //         }
        //     });
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


        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(function(res){
                    if(res.status === 200) {
                        toastr.success("Success");
                    } else {
                        toastr.error("User Not Found", 1000);
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

    function SettingController($location, $routeParams, UserService) {

    }
})();