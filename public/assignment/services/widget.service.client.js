/**
 * Created by leyiqiang on 5/30/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    
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
