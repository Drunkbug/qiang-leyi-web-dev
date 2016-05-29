/**
 * Created by leyiqiang on 5/29/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);


    var users =[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function ProfileController($routeParams) {
        var vm = this;

        vm.updateUser = updateUser;
        var id = $routeParams["id"];
        var index = -1;
        for(var i in users) {
            if(users[i]._id === id) {
                vm.user = users[i];
                index = i;
            }
        }

        function updateUser() {
            users[i].firstName = vm.user.firstName;
            users[i].lastName = vm.user.lastName;
        }
    }
    function LoginController($location) {

        var vm = this;
        vm.login =  Login;

        function Login(username, password) {
            var flag = false;
            for (var i in users) {
                var id = users[i]._id;
                if(users[i].username === username && users[i].password === password) {
                    $location.url("/profile/" + id);
                    flag = true;
                }
            }
            if (!flag) {
                Materialize.toast("User Not Found", 1000);
            }
        }
    }

})();