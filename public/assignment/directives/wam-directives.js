/**
 * Created by leyiqiang on 6/11/16.
 */
(function(){
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var start = -1;
            var stop = -1;
            $(element)
                .find("div")
                .sortable(
                    {
                    start: function (event, ui) {
                        start =  ui.item.index();
                        console.log("start");
                    },
                    stop: function (event, ui) {
                        stop = ui.item.index();
                        console.log("stop");

                        var sortedElement = scope.data.splice(start, 1)[0];
                        console.log(sortedElement)
                        scope.data.splice(stop, 0, sortedElement);
                        console.log(stop)
                        scope.sortlist({start: start, stop: stop});
                    }
                });
        }
        return {
            templateUrl:"./views/widget/wam-sortable.html",
            scope: {
                // title: "=",
                // border:"=",
                data:"=",
                sortlist:"&sort"
            },
            link: linker
        }
    }
})();