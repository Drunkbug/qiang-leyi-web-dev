/**
 * Created by leyiqiang on 5/30/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "title":"title 1" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "title":"title 1" },
        {"_id": "543", "name": "Post 3", "websiteId": "456", "title": "title 1"}
    ];

    function PageService() {
        var api = {
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById:findPageById,
            createPage:createPage,
            updatePage:updatePage,
            deletePage:deletePage
        };
        return api;

        function findPageById(pageId) {
            for (var i in pages) {
                if(pages[i]._id == pageId) {
                    return pages[i];
                }
            }
            return null;
        }
        function findPagesByWebsiteId(websiteId) {
            var result = [];
            for (var i in pages) {

                if(pages[i].websiteId == websiteId) {
                    result.push(pages[i]);
                }
            }
            return result;
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        function updatePage(pageId, page) {
            for (var i in pages) {
                if(pages[i]._id == pageId) {
                    pages[i] = page;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for (var i in pages) {
                if(pages[i]._id == pageId) {
                    pages.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
})();
