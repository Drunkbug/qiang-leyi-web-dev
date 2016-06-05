/**
 * Created by leyiqiang on 5/30/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById:findWidgetById,
            createWidget:createWidget,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget
        };
        return api;

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }
        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/"+pageId+"/widget";
            var data = {
                pageId:pageId,
                widget:widget
            };
            return $http.post(url, data);
        }

        function updateWidget(widgetId, widget) {
            var url ="/api/widget/"+widgetId;
            var data = {
                widgetId:widgetId,
                widget:widget
            };
            return $http.put(url, data);
        }

        function deleteWidget(widgetId) {
            var url ="/api/widget/"+widgetId;
            return $http.delete(url);
        }
    }
})();
