var model = require("./model"),
  logger = require("../../modules/logger"),
  logMsg = require("../utils/logger-message"),
  Response = require("../utils/Response");

var restaurents = [{
        name : "Fresh Menu",
        id : "B1234",
        lat : 12.9321802,
        lng : 77.6129255,
        coupons : [{
            claimed : false,
            id : "12",
          name : "CheckIn offer",
          type : "checkin"
        }]
    },{
        name : "Empire Restaurant",
        id : "B1235",
        lat : 12.9297228,
        lng : 77.6145456,
        coupons : [{
            id : "13",
            claimed : false,
            name : "CheckIn offer",
            type : "checkin"
        }]
    },{
    name : "KFC",
    id : "B1236",
    lat : 12.9321802,
    lng : 77.6129255,

    coupons : [{
        id : "14",
        claimed : true,
        name : "CheckIn offer",
        type : "checkin"
    }]
}];



exports.getRestaurants = function (req, res) {
    res.json(Response.r(true, null,{restaurents : restaurents} ));
};

exports.getRestaurant = function (req, res) {
    var id = req.params.id
    res.json(Response.r(true, null,{restaurent : restaurents[2]} ));
};

exports.claim = function (req, res) {
    var id = req.params.id
    res.json(Response.r(true, null,{claimed : true} ));
};

exports.testUnocoin = function (req, res) {
    res.json(Response.r(true, null, { working : true}));
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
