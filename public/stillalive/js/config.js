/**
 * Created by leyiqiang on 6/5/16.
 */
(function() {
    angular.module("StillAliveAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider

            .when("/main", {
                templateUrl: "views/user/main.view.client.html",
                controller: "MainController",
                controllerAs:"model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller:"RegisterController",
                controllerAs:"model"
            })
            .when("/profile/:id", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs:"model"
            })
            .otherwise({
                redirectTo:"/main"
            });
    }
})();
