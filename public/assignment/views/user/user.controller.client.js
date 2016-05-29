/**
 * Created by leyiqiang on 5/29/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController() {
        var users =[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var vm = this;
        vm.hello = "Hello from viewmodel";
        vm.login =  Login;

        function Login(username, password) {
            flag = false;
            for (var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    console.log("YAY");
                    flag = true;
                }
            }
            if (!flag) {
                Materialize.toast("User Not Found", 1000);
            }
        }
    }

})();