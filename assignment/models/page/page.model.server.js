/**
 * Created by leyiqiang on 6/11/16.
 */
var mongoose = require("mongoose");
module.exports = function () {
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findPagesByWebsiteId: findPagesByWebsiteId,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };

    return api;


    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);

    }
    
    function findPagesByWebsiteId(websiteId) {
        return Page.find({_website: websiteId});
        
    }
    
    function findPageById(pageId) {
        return Page.findOne({_id: pageId});
        
    }
    
    function updatePage(pageId, page) {
        return Page.update(
            {_id: pageId},
            {
                $set: {
                    name: page.name,
                    title: page.title
                    // description: page.description
                }
            });
        
    }
    
    function deletePage(pageId) {
        return Page.remove({_id: pageId});
        
    }




};