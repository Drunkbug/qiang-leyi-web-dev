/**
 * Created by leyiqiang on 6/5/16.
 */
(function () {
    angular.module("StillAliveAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider

            .when("/main", {
                templateUrl: "views/user/main.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/profile/:id", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:id/will", {
                templateUrl: "views/will/will-list.view.client.html",
                controller: "WillListController",
                controllerAs: "model"
            })
            .when("/user/:id/will/:wid", {
                templateUrl: "views/will/edit-will.view.client.html",
                controller: "EditWillController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/login.view.admin.html",
                controller: "AdminLoginController",
                controllerAs: "model"
            })
            .when("/admin/:aid", {
                templateUrl: "views/admin/client-list.view.admin.html",
                controller: "ClientListController",
                controllerAs: "model"
            })
            .when("/admin/:aid/client/:cid", {
                templateUrl: "views/admin/client-info.view.admin.html",
                controller: "ClientInfoController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/main"
            });

        function checkLoggedin(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();


            UserService
                .checkLoggedin()
                .then(
                    function (res) {
                        var user = res.data;
                        if (user == '') {
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/main");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("/main");
                    }
                );
            return deferred.promise;
        }
    }
})();
