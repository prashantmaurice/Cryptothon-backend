/**
 *
 * @param req: request object from express
 * @param msg: logger message to be appended
 * @returns {"log msg"}
 */
exports.getMessage = function (req, msg) {
  "use strict";
  if (!req.headers) {
    return "";
  } else {
    return req.clientIp + ";" + req.method + " " + req.originalUrl + ";" +
      (msg || "No Message");
  }
};
