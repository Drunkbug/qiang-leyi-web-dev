/**
 * Created by leyiqiang on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var uid = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesForUser(uid);



    }
})();