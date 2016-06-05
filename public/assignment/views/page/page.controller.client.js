/**
 * Created by leyiqiang on 5/30/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("EditPageController", EditPageController)
        .controller("NewPageController", NewPageController);
    function EditPageController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function (res) {
                    vm.page = res.data;
                });
        }
        init();

        function updatePage() {
            PageService
                .updatePage(vm.pageId, vm.page)
                .then(function (res) {
                    var result = res.status;
                    if(result === 200) {
                        Materialize.toast("Success", 1000);
                    } else {
                        Materialize.toast("Page Not Found", 1000);
                    }
                });
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
        }
    }


    function PageListController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        function init() {
            var uid = vm.uid;
            PageService
                .findPagesByWebsiteId(vm.wid)
                .then(function (res) {
                    vm.pages = res.data;
                });
        }

        init();
    }

    function NewPageController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createPage  = createPage;
        function init() {
            PageService
                .findPagesByWebsiteId(vm.wid)
                .then(function (res) {
                    vm.pages = res.data;
                });
        }
        init();

        function createPage(name, title) {
            var newPage = {
                _id: (new Date()).getTime(),
                name: name,
                websiteId: vm.wid,
                title: title
            };
            PageService
                .createPage(vm.wid, newPage)
                .then(function (res) {
                    Materialize.toast("Success", 1000);
                });
        }


    }
})();