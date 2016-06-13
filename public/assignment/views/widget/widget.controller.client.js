/**
 * Created by leyiqiang on 5/30/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("WidgetChooserController", WidgetChooserController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("WidgetFlikrSearchController", WidgetFlikrSearchController);
    var orderFlag = -1;
    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;
        vm.sortWidget = sortWidget;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .then(function (res) {
                    vm.widgets = res.data;
                    vm.widgets.sort(function(a, b){
                        return a.order-b.order;
                    });

                    console.log(vm.widgets)
                });
        }

        init();
        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }

        function getTrustedUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        // $(".widget-container")
        //     .sortable({axis:"y"});
        // (".widget-container").draggable();
        function sortWidget(start, stop) {
            WidgetService
                .reorderWidget(vm.pid, start, stop)
                .then(
                    function (res) {
                        vm.widgets = res.data;
                    }
                )
        }

    }

    function WidgetChooserController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.createWidget = createWidget;
        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .then(function (res) {
                    vm.widgets = res.data;
                });
        }

        init();

        function createWidget(widgetType) {
            orderFlag+=1;
            var newWidget = {
                _page: vm.pid,
                widgetType: widgetType,
                order:orderFlag
            };
            WidgetService
                .createWidget(vm.pid, newWidget)
                .then(function (res) {
                    var widget = res.data;
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
                    return newWidget;
                });
        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .then(function (res) {
                    vm.widget = res.data;
                });
            // WidgetService
            //     .findWidgetsByPageId(vm.pid)
            //     .then(function (res) {
            //         vm.widgets = res.data;
            //     });
        }

        init();


        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid);
        }

        function updateWidget() {
            WidgetService
                .updateWidget(vm.wgid, vm.widget)
                .then(function (res) {
                    var result = res.status;
                    if (result === 200) {
                        Materialize.toast("Success", 1000);
                    } else {
                        Materialize.toast("Widget Not Found", 1000);
                    }
                });

        }
    }

    function WidgetFlikrSearchController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.addFlikrUrl = addFlikrUrl;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .then(function (res) {
                    vm.widget = res.data;
                });
        }

        init();
        function searchPhotos(searchTest) {
            WidgetService
                .searchPhotos(searchTest)
                .then(function (res) {
                    data = res.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                })
        }

        function addFlikrUrl(photo) {
            vm.widget.url  = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server+"/" + photo.id + "_" + photo.secret + "_q.jpg";
            WidgetService
                .updateWidget(vm.wgid, vm.widget)
                .then(function (res) {
                    var result = res.status;
                    if (result === 200) {
                        Materialize.toast("Success", 1000);
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.widget._id);
                    } else {
                        Materialize.toast("Widget Not Found", 1000);
                    }
                });
        }

    }

})();