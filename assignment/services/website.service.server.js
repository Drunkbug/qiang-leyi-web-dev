/**
 * Created by leyiqiang on 6/4/16.
 */
module.exports = function(app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description":"this is facebook" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456","description":"this is Tweeter" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456","description":"this is Gizmodo" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123","description":"this is Tic Tac Toe" },
        { "_id": "678", "name": "Checkers",    "developerId": "123","description":"this is Checkers" },
        { "_id": "789", "name": "Chess",       "developerId": "234","description":"this is Chess" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.body.userId;
        var website = req.body.website;
        website.developerId = userId;
        websites.push(website);
        res.sendStatus(200);
    }

    function findWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var result = [];
        for (var i in websites) {
            if(websites[i].developerId == userId) {
                result.push(websites[i]);
            }
        }
        res.json(result);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var flag = false;
        for (var i in websites) {
            if(websites[i]._id == websiteId) {
                res.json(websites[i]);
                flag = true;
            }
        }
        if(!flag) {
            res.json(null);
        }
    }

    function updateWebsite(req, res) {
        var websiteId = req.body.websiteId;
        var website = req.body.website;
        var flag = false;
        for (var i in websites) {
            if(websites[i]._id == websiteId) {
                websites[i] = website;
                flag = true;
                res.sendStatus(200);
            }
        }
        if(!flag) {
            res.status(400).send("website not found");
        }
    }

    function deleteWebsite(req, res) {
        var flag = false;
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if(websites[i]._id == websiteId) {
                websites.splice(i,1);
                flag = true;
                res.sendStatus(200);
            }
        }
        if(!flag) {
            res.status(400).send("website not found");
        }
    }
};