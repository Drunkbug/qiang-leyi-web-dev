/**
 * Created by leyiqiang on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(Config);


    function Config($routeProvider) {
        $routeProvider
            // user routes
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

            // website routes
            .when("/user/:uid/website",{
                templateUrl:"views/website/website-list.view.client.html",
                controller:"WebsiteListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:websiteId", {
                templateUrl:"views/website/website-edit.view.client.html",
                controller:"EditWebsiteController",
                controllerAs:"model"

            })
            // page routes

            // widget routes
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl:"views/widget/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl:"views/widget/widget-chooser.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl:"widget-edit.view.client.html"
            })
            // .otherwise({
            //     redirectTo:"/login"
            // })
            ;
    }
})();