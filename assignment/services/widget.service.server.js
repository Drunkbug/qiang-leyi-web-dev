/**
 * Created by leyiqiang on 6/3/16.
 */

module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Technically, this isn’t an actual cat, but a so-called “<a href="https://en.wikipedia.org/wiki/Cat_state" rel="noopener" target="_blank">cat state</a>” in which two (or more) particles are in two different states at the same time. For decades, Schroedinger’s cat was just a morbid thought experiment, but in 2005 physicists at the National Institute of Standards and Technology <a href="http://www.nature.com/nature/journal/v438/n7068/abs/nature04251.html" rel="noopener" target="_blank">successfully created</a> an actual “cat state” in the laboratory. They used six atoms all in simultaneous <a href="http://www.scientificamerican.com/article/what-exactly-is-the-spin/" rel="noopener" target="_blank">“spin up”and “spin down” states</a>—think of it as spinning clockwise and counter-clockwise <a href="http://www.nytimes.com/2005/12/27/science/quantum-trickery-testing-einsteins-strangest-theory.html" rel="noopener" target="_blank">at the same time</a>. Since then, other physicists have created their own large cat states with photons.</p>'},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var pageId        = req.body.pageId;
        var websiteId     = req.body.websiteId;
        var userId        = req.body.userId;
        var width         = req.body.width;
        var myFile        = req.file;
        if(myFile == null) {
            res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            return;
        }
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        for (var i in widgets) {
            if(widgets[i]._id == widgetId) {
                widgets[i].url = "/uploads/"+filename;
            }
        }
        res.redirect("/assignment/index.html#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);

    }

    function createWidget(req, res) {
        var pageId = req.body.pageId;
        var widget = req.body.widget;
        widget.pageId = pageId;
        widgets.push(widget);
    }
    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        var result = [];
        for (var i in widgets) {
            if(widgets[i].pageId == pageId) {
                result.push(widgets[i]);
            }
        }
        res.json(result);
    }
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var flag = false;
        for (var i in widgets) {
            if(widgets[i]._id == widgetId) {
                res.json(widgets[i]);
                flag = true;
            }
        }
        if(!flag) {
            res.json(null);
        }
    }
    function updateWidget(req, res) {
        var widgetId = req.body.widgetId;
        var widget = req.body.widget;
        var flag = false;
        for (var i in widgets) {
            if(widgets[i]._id == widgetId) {
                widgets[i] = widget;
                flag = true;
                res.sendStatus(200);
            }
        }
        if(!flag) {
            res.status(404).send("widget not found");
        }
    }
    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        var flag = false;
        for (var i in widgets) {
            if(widgets[i]._id == widgetId) {
                widgets.splice(i,1);
                flag = true;
                res.sendStatus(200);
            }
        }
        if(!flag) {
            res.status(400).send("widget not found");
        }
    }
};
