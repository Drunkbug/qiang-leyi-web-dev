/**
 * Created by leyiqiang on 6/6/16.
 */
(function() {
    angular
        .module("StillAliveAppMaker")
        .controller("AdminLoginController", AdminLoginController)
        .controller("ClientListController", ClientListController)
        .controller("ClientInfoController", ClientInfoController);



    function AdminLoginController($location, UserService) {
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

    function ClientListController($location, $routeParams, UserService) {
        
    }

    function ClientInfoController($location, $routeParams, UserService) {

    }
})();