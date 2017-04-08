var model = require("./model"),
  logger = require("../../modules/logger"),
  logMsg = require("../utils/logger-message"),
  Response = require("../utils/Response");

exports.getRestaurants = function (req, res) {
  "use strict";
  try {
    model.getRestaurants(req.query, function (err, restaurants) {
      if (err || !restaurants) {
        logger.error(err, {
          filePath: "api/restaurants/controller",
          functionName: "getRestaurants",
          msg: logMsg.getMessage(req, err)
        });
        res.json(Response.r(false, err, null));
      } else {
        logger.info({
          filePath: "api/restaurants/controller",
          functionName: "getRestaurants",
          msg: logMsg.getMessage(req, "success")
        });
        res.json(Response.r(true, null, restaurants));
      }
    });
  } catch (e) {
    logger.error(e, {
      filePath: "api/restaurants/controller",
      functionName: "getRestaurants",
      msg: logMsg.getMessage(req, e)
    });

    res.json(Response.r(false, {msg: e.toString()}, null));
  }
};


exports.register = function (req, res) {
  "use strict";
  var restaurant;

  try {
    restaurant = req.body; // eslint-disable-line
    model.register(restaurant, function (err, restaurant) {
      if (err) {
        logger.error(err, {
          filePath: "api/users/controller",
          functionName: "register",
          msg: logMsg.getMessage(req, err)
        });
        res.json(Response.r(false, err, null));
      } else {
        logger.info({
          filePath: "api/restaurants/controller",
          functionName: "register",
          msg: logMsg.getMessage(req, "success")
        });
        res.json(Response.r(true, null, restaurant));
      }
    });
  } catch (e) {
    logger.error(e, {
      filePath: "api/restaurants/controller",
      functionName: "register",
      msg: logMsg.getMessage(req, e)
    });
    res.json(Response.r(false, {msg: e.toString()}, null));
  }
};
