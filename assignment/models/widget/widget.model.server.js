/**
 * Created by leyiqiang on 6/11/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findWidgetsByPageId: findWidgetsByPageId,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);

    }

    function findWidgetsByPageId(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findOne({_id: widgetId});

    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.findOneAndUpdate({_id: widgetId}, widget);
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {
        start = parseInt(start);
        end = parseInt(end);
        return Widget
            .find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.order > start && widget.order <= end) {
                            widget.order--;
                            widget.save();
                            console.log("1changed from " + (widget.order + 1) + "to --")
                        } else if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                            console.log("2changed from " + (start) + "to" + end)

                        }
                    } else if (start > end) {
                        if (widget.order >= end && widget.order < start) {
                            widget.order++;
                            widget.save();
                            console.log("3changed from " + (widget.order - 1) + "to ++")

                        }
                        else if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                            console.log("4changed from " + (start) + "to" + end)

                        }
                    }
                })
            });
    }
};