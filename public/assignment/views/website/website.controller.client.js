/**
 * Created by leyiqiang on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("NewWebsiteController", NewWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.websiteId = $routeParams.websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();
 
        function updateWebsite() {
            var result = WebsiteService.updateWebsite(vm.websiteId, vm.website);
            if(result === true) {
                Materialize.toast("Success", 1000);
            } else {
                Materialize.toast("User Not Found", 1000);
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }
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

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createWebsite  = createWebsite;
        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(vm.uid);
        }
        init();

        function createWebsite(name, description) {
            var newWebsite = {
                _id: (new Date()).getTime(),
                name: name,
                developerId: vm.uid,
                description: description
            };
            WebsiteService.createWebsite(vm.uid, newWebsite);
            Materialize.toast("Success", 1000);
        }
        
    }
})();