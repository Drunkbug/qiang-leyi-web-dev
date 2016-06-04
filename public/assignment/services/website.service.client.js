/**
 * Created by leyiqiang on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);



    function WebsiteService($http) {
        var api = {
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById:findWebsiteById,
            createWebsite:createWebsite,
            updateWebsite:updateWebsite,
            deleteWebsite:deleteWebsite
        };
        return api;

        function findWebsiteById(websiteId) {
            var url = "http://localhost:3000/api/website/"+websiteId;
            return $http.get(url);
        }
        function findWebsitesForUser(userId) {
            var url = "http://localhost:3000/api/user/"+userId+"/website";
            return $http.get(url);
        }

        function createWebsite(userId, website) {
            var url = "http://localhost:3000/api/user/"+userId+"/website";
            var data = {
                userId:userId,
                website: website
            };

            return $http.post(url, data);
        }

        function updateWebsite(websiteId, website) {
            var url = "http://localhost:3000/api/website/"+websiteId;
            var data = {
                websiteId:websiteId,
                website:website
            };
            return $http.put(url, data);
        }

        function deleteWebsite(websiteId) {
            var url = "http://localhost:3000/api/website/"+websiteId;
            return $http.delete(url);
        }
    }
})();
