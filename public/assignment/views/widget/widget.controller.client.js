/**
 * Created by leyiqiang on 5/30/16.
 */
(function () {
    $(document).ready(function() {
        $('select').material_select();
    });
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("WidgetChooserController", WidgetChooserController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }
        init();

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }

        function getTrustedUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length-1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
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
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }
        init();

        function createWidget(widgetType) {
            var newWidget = {
                _id:(new Date()).getTime(),
                name:"",
                widgetType:widgetType,
                pageId:vm.pid
            };
            WidgetService.createWidget(vm.pid, newWidget);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+newWidget._id);
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
            vm.widget=WidgetService.findWidgetById(vm.wgid);
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
            console.log(vm.widget)
        }
        init();

        function deleteWidget() {
            WidgetService.deleteWidget(vm.wgid);
        }
        // function updateWidget(widgetId, widget)
        function updateWidget() {
            var result = WidgetService.updateWidget(vm.wgid, vm.widget);
            if(result === true) {
                Materialize.toast("Success", 1000);
            } else {
                Materialize.toast("Widget Not Found", 1000);
            }
            console.log(vm.widgets)
        }
    }
})();