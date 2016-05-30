/**
 * Created by leyiqiang on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description":"this is facebook" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456","description":"this is Tweeter" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456","description":"this is Gizmodo" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123","description":"this is Tic Tac Toe" },
        { "_id": "678", "name": "Checkers",    "developerId": "123","description":"this is Checkers" },
        { "_id": "789", "name": "Chess",       "developerId": "234","description":"this is Chess" }
    ];

    function WebsiteService() {
        var api = {
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById:findWebsiteById,
            createWebsite:createWebsite,
            updateWebsite:updateWebsite,
            deleteWebsite:deleteWebsite
        };
        return api;

        function findWebsiteById(websiteId) {
            for (var i in websites) {
                if(websites[i]._id == websiteId) {
                    return websites[i];
                }
            }
            return null;
        }
        function findWebsitesForUser(userId) {
            var result = [];
            for (var i in websites) {
                if(websites[i].developerId == userId) {
                    result.push(websites[i]);
                }
            }
            return result;
        }

        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
        }

        function updateWebsite(websiteId, website) {
            for (var i in websites) {
                if(websites[i]._id == websiteId) {
                    websites[i] = website;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(websiteId) {
            for (var i in websites) {
                if(websites[i]._id == websiteId) {
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
})();
