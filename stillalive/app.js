/**
 * Created by leyiqiang on 6/5/16.
 */
module.exports = function(app) {
    var userService = require("./services/user.service.server.js")(app);
    var profileService = require("./services/profile.service.server")(app);
    var willService = require("./services/will.service.server")(app);
    var adminService = require("./services/admin.service.server")(app);
};