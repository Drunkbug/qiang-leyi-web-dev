/**
 * Created by leyiqiang on 6/4/16.
 */
module.exports = function (app, models) {
    var pageModel = models.pageModel;

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "title":"title 1" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "title":"title 1" },
    //     {"_id": "543", "name": "Post 3", "websiteId": "456", "title": "title 1"}
    // ];

    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findPagesByWebsiteId);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId",deletePage);

    function createPage(req, res) {
        var websiteId = req.body.websiteId;
        var page = req.body.page;
        pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        // page.websiteId = websiteId;
        // pages.push(page);
        // res.json(pages);
    }

    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findPagesByWebsiteId(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        // var result = [];
        // // for (var i in pages) {
        // //     if(pages[i].websiteId == websiteId) {
        // //         result.push(pages[i]);
        // //     }
        // // }
        // // res.json(result);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.status(404).send(err);
                }
            );
        // var flag = false;
        // for (var i in pages) {
        //     if(pages[i]._id == pageId) {
        //         flag = true;
        //         res.json(pages[i]);
        //     }
        // }
        // if(!flag) {
        //     res.json(null);
        // }
    }

    function updatePage(req, res) {
        var pageId = req.body.pageId;
        var page = req.body.page;
        pageModel
            .updatePage(pageId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        // for (var i in pages) {
        //     if (pages[i]._id == pageId) {
        //         pages[i] = page;
        //         res.sendStatus(200);
        //     }
        // }
        // res.status(404).send("page not found");
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        // for (var i in pages) {
        //     if (pages[i]._id == pageId) {
        //         pages.splice(i, 1);
        //         res.sendStatus(200);
        //     }
        // }
        // res.status(404).send("page not found");
    }


};