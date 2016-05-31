/**
 * Created by leyiqiang on 5/30/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    widgets = [
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

    function WidgetService() {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById:findWidgetById,
            createWidget:createWidget,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget
        };
        return api;

        function findWidgetById(widgetId) {
            for (var i in widgets) {
                if(widgets[i]._id == widgetId) {
                    return widgets[i];
                }
            }
            return null;
        }
        function findWidgetsByPageId(pageId) {
            var result = [];
            for (var i in widgets) {
                if(widgets[i].pageId == pageId) {
                    result.push(widgets[i]);
                }
            }
            return result;
        }

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);

        }

        function updateWidget(widgetId, widget) {
            for (var i in widgets) {
                if(widgets[i]._id == widgetId) {
                    widgets[i] = widget;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for (var i in widgets) {
                if(widgets[i]._id == widgetId) {
                    widgets.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
})();
