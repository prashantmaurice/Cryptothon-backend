/**
 *
 * This file is the entry file for express. It does the following:
 *  1. Loads express, (ReST framework for NodeJS)
 *    mongoose, (MongoDb drive for NodeJS)
 *    config, (general config file for application)
 *    bodyParser (needed for parsing request data in JSON, url-encoded format)
 *    accessControl (handles response headers)
 *    logger (logging module for application)
 *
 *  2. Sets appPath which is the root directory of the application,
 *    viewEngine (Jade engine),
 *    loads plugin views (path to jade files for plugins)
 *
 *  3. Sets the port for HTTP server loaded from config
 *
 *  4. Redirects to routes.js using middleware function next()
 *
 */

var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  config = require("./config"),
  bodyParser = require("body-parser"),
  accessControl = require("./modules/access-control"),
  logger = require("./modules/logger"),
  requestIp = require("request-ip");

// load appPath
app.set("appPath", config.root);

// load bodyParser for parsing request data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// load requestIp module to handle remote IP fetch
app.use(requestIp.mw());

// connect to mongoDb
mongoose.connect(config.mongo.uri, config.mongo.options);

// load accessControl to send as response
app.use(accessControl);

// load routes.js
require("./routes")(app);
console.log("jdslkfjdskljf");

// set server port to run on
app.set("port", config.port);

// Need this to close connection in test file.
app.running = app.listen(app.get("port"));


// Calling logger module at info level
logger.info({
  filePath: "Server",
  functionName: "Main",
  msg: "Server started at PORT " + app.get("port") + " for " +
    app.get("env") + " environment"
});

module.exports = app;
