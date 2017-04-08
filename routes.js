/**
 *
 * This file gets loaded by server.js to handle the routing request from client
 * It provides the following features:
 *  1. Loads permissions module as a middleware for authorization
 *  2. Loads video module for handling videos API request
 *  3. Loads clients module for handling clients API request
 *
 */

var logger = require("./modules/logger"),
  Response = require("./api/utils/Response"),
  logMsg = require("./api/utils/logger-message");

/**
 *
 * @param app
 *
 * This function forwards requests to the respective route modules
 * or returns 404
 *
 */
module.exports = function (app) {
  "use strict";

  // Routes for API requests

  // redirect event routes to event module index.js file
  app.use("/api/restaurants", require("./api/restaurants"));
  app.use("/cryptothon/api/users", require("./api/users"));

  // All other routes should redirect to 404
  app.all("*", function (req, res) {
    logger.info({
      filePath: "routes",
      functionName: "route",
      msg: logMsg.getMessage(req, "No such endpoint")
    });
    res.status(404).json(Response.r(false, {msg: "No such endpoint"}, null));
  });
};
