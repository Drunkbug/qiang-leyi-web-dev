/**
 * Created by leyiqiang on 5/30/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);


    function PageService($http) {
        var api = {
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;
        
        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            var data = {
                websiteId: websiteId,
                page: page
            };
            return $http.post(url, data);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            var data = {
                pageId: pageId,
                page: page
            };
            return $http.put(url, data);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();
