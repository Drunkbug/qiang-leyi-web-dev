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
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage() {
            var result = PageService.updatePage(vm.pageId, vm.page);
            if(result === true) {
                Materialize.toast("Success", 1000);
            } else {
                Materialize.toast("Page Not Found", 1000);
            }
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
        }
    }


    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        function init() {
            var uid = vm.uid;
            vm.pages = PageService.findPagesByWebsiteId(vm.wid);
        }

        init();
    }

    function NewPageController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createPage  = createPage;
        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.wid);
        }
        init();

        function createPage(name, title) {
            var newPage = {
                _id: (new Date()).getTime(),
                name: name,
                websiteId: vm.wid,
                title: title
            };
            PageService.createPage(vm.uid, newPage);
            Materialize.toast("Success", 1000);
        }


    }
})();