/**
 * Created by leyiqiang on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.websiteId;

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();
    }
    
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;

        function init() {
            var uid = vm.uid;
            vm.websites = WebsiteService.findWebsitesForUser(uid);
        }

        init();


    }
})();