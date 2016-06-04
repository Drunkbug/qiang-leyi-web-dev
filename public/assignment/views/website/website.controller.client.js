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
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (res) {
                    vm.website = res.data;
                });
        }
        init();
 
        function updateWebsite() {
            WebsiteService
                .updateWebsite(vm.websiteId, vm.website)
                .then(function (res) {
                    var result = res.status;
                    if(result === 200) {
                        Materialize.toast("Success", 1000);
                    } else {
                        Materialize.toast("Website Not Found", 1000);
                    }
                });
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
            WebsiteService
                .findWebsitesForUser(uid)
                .then(function (res) {
                    vm.websites = res.data;
                });
        }

        init();
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createWebsite  = createWebsite;
        function init() {
            WebsiteService
                .findWebsitesForUser(vm.uid)
                .then(function (res) {
                    vm.websites = res.data;
                });
        }
        init();

        function createWebsite(name, description) {
            var newWebsite = {
                _id: (new Date()).getTime(),
                name: name,
                developerId: vm.uid,
                description: description
            };
            WebsiteService
                .createWebsite(vm.uid, newWebsite)
                .then(function (res) {
                    Materialize.toast("Success", 1000);
                });
        }
        
    }
})();