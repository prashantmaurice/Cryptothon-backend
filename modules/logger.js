/*
 * Logger module for logging different levels i.e info, debug, error
 * Levels are configured according to the node environment
 * if env is "Development" then level is debug and for
 * "Production" env level is info
 *
 * TODO: Integration with RabbitMQ using amqp-winstone
 * TODO: Shell script integration for creating directory.
 */

var winston = require("winston"),
  config = require("../config"),
  utils = require("./utils"),
  is_dev = (config.env === "development"), // Checking environment
  log_dir = config.logger.logDir,
  file = utils.getLogFile(log_dir),
  level = is_dev ? "debug" : "info", // Setting levels
  transports = winston.transports,
  Console = transports.Console,
  File = transports.File,
  winstonObj = new(winston.Logger)({

    /* Transports is essentially a storage device for logs.
     * Follow given link -
     * https://github.com/winstonjs/winston/blob/master/docs/transports.md
     * Check other transports also HTTP and Mongo
     */
    transports: [

      // Using console transport
      // Disable in production environment.
      new Console({
        json: false, // Type : text, No JSON
        level: level, // Level of logging e.g debug, error, info
        colorize: true // Different colors for different levels
      }),

      // File transport for logging in file
      new File({
        filename: file, // filename - taking from config.
        json: false, // Print as a sentence not as a JSON
        level: level, // Which level
        timestamp: true, // Print timestamp
        maxsize: 100000000, // Keeping 1000 mb
        handleExceptions: true,
        humanReadableUnhandledException: true
      })
    ],

    // This only caught unhandled exceptions.
    exceptionHandlers: [
      new File({
        filename: file,
        json: false,
        level: level,
        handleExceptions: true,
        humanReadableUnhandledException: true
      })
    ],
    exitOnError: false
  }),

  /*
   * This is the logging function which means
   * @Params: type i.e level, opts: options
   */
  log = function (type, opts) {
    "use strict";

    winstonObj[type](opts.filePath + "." +
      opts.functionName + ":", opts.msg);
  };

/*
 * module.exports indicates it can be used a module using
 * logger = require("logger") in any file
 */
module.exports = {

  // This is for error level logging
  error: function (err, opts) {
    "use strict";

    var type = "",
      filePath = "NO PATH.",
      functionName = "NO FUNCTION:",
      title = "", msg = "NO MESSAGE",
      stack = "";

    if (opts && opts.filePath) {
      filePath = opts.filePath + ".";
    }

    if (opts && opts.functionName) {
      functionName = opts.functionName;
    }

    if (opts && opts.msg) {
      msg = opts.msg;
    } else if (err && err.message) {
      msg = err.message;
    }

    if (err && (err.name || err.code)) {
      type = err.name || err.code;
    }

    if (err && err.stack) {
      stack = err.stack;
    }

    title = (filePath + functionName) || type;
    winstonObj.error(title, msg, opts.data, stack);
  },

  // This is debug level logging
  // Which is internally calling log function
  debug: log.bind(null, "debug"),

  // Info level logging
  // Calling log function
  info: log.bind(null, "info")
};
