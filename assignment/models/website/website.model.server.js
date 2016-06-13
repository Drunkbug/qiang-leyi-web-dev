/**
 * Created by leyiqiang on 6/11/16.
 */
var mongoose = require("mongoose");
module.exports = function () {
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);


    var api = {
        findWebsitesForUser: findWebsitesForUser,
        createWebsite: createWebsite,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite

    };
    return api;

    function findWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function createWebsite(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    function findWebsiteById(websiteId) {
        return Website.findOne({_id: websiteId});

    }

    function updateWebsite(websiteId, website) {
        return Website.update(
            {_id: websiteId},
            {
                $set: {
                    name: website.name,
                    description: website.description
                }
            });

    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
};