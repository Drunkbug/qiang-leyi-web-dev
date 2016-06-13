/**
 * Created by leyiqiang on 5/30/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var key = "994aa4e7731e69c44e10c44bf4bec526";
    var secret = "156965e24e478f5b";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function WidgetService($http) {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            searchPhotos: searchPhotos,
            reorderWidget: reorderWidget
        };
        return api;

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            var data = {
                pageId: pageId,
                widget: widget
            };
            return $http.post(url, data);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            var data = {
                widgetId: widgetId,
                widget: widget
            };
            return $http.put(url, data);
        }

        function reorderWidget(pageId, start, end) {
            var url = "/api/widget/" + pageId + "/widget?start=" + start + "&end=" + end;
            return $http.put(url);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
