/**
 * Created by leyiqiang on 6/5/16.
 */
module.exports = function(app) {
    var models = require("./models/models.js")();
    var userService = require("./services/user.service.server.js")(app, models);
    // var willService = require("./services/will.service.server")(app, models);
    // var adminService = require("./services/admin.service.server")(app, models);
};