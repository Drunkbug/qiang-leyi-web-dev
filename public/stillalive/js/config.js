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
                templateUrl: "views/profile/profile.view.client.html",
                controller: "ProfileController",
                controllerAs:"model"
            })
            .when("/profile/:id/connection", {
                templateUrl: "views/profile/connection.view.client.html",
                controller: "ConnectionController",
                controllerAs:"model"
            })
            .when("/profile/:id/setting", {
                templateUrl: "views/profile/setting.view.client.html",
                controller: "SettingController",
                controllerAs:"model"
            })
            .when("/profile/:id/will", {
                templateUrl: "views/will/will-list.view.client.html",
                controller: "WillListController",
                controllerAs:"model"
            })
            .when("/profile/:id/will/:wid", {
                templateUrl: "views/will/edit-will.view.client.html",
                controller: "EditWillController",
                controllerAs:"model"
            })
            .when("/admin", {
                templateUrl: "views/admin/login.view.admin.html",
                controller: "AdminLoginController",
                controllerAs:"model"
            })
            .when("/admin/:aid", {
                templateUrl: "views/admin/client-list.view.admin.html",
                controller: "ClientListController",
                controllerAs:"model"
            })
            .when("/admin/:aid/client/:cid", {
                templateUrl: "views/admin/client-info.view.admin.html",
                controller: "ClientInfoController",
                controllerAs:"model"
            })
            .otherwise({
                redirectTo:"/main"
            });
    }
})();
