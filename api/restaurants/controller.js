var model = require("./model"),
  logger = require("../../modules/logger"),
  logMsg = require("../utils/logger-message"),
  Response = require("../utils/Response");

var restaurants = [{
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

// exports.getRestaurants = function (req, res) {
//   "use strict";
//   try {
//     model.getRestaurants(req.query, function (err, restaurants) {
//       if (err || !restaurants) {
//         logger.error(err, {
//           filePath: "api/restaurants/controller",
//           functionName: "getRestaurants",
//           msg: logMsg.getMessage(req, err)
//         });
//         res.json(Response.r(false, err, null));
//       } else {
//         logger.info({
//           filePath: "api/restaurants/controller",
//           functionName: "getRestaurants",
//           msg: logMsg.getMessage(req, "success")
//         });
//         res.json(Response.r(true, null, restaurants));
//       }
//     });
//   } catch (e) {
//     logger.error(e, {
//       filePath: "api/restaurants/controller",
//       functionName: "getRestaurants",
//       msg: logMsg.getMessage(req, e)
//     });
//
//   res.json(Response.r(false, {msg: e.toString()}, null));
//   }
// };

exports.getRestaurants = function (req, res) {
    res.json(Response.r(true, null,{restaurants : restaurants} ));
};

// exports.updateRestaurant = function (req, res) {
//     var q = req.body, i,
//       claimed = false;
//     if (!(q.id)) {
//       res.json(Response.r(false, "id needs to be present"));
//     }
//     else {
//       for (i = 0; i < restaurants.length; i++) {
//         if (restaurant[i].id === q.id) {
//           if (!restaurant[i].coupons[0].claimed) {
//             restaurant[i].coupons[0].claimed = true;
//             claimed = true
//           } else {
//
//           }
//         }
//       }
//     }
//     res.json(Response.r(true, null,{restaurants : restaurants} ));
// };


exports.getRestaurant = function (req, res) {
    var id = req.query.id

    console.log(req.query);
    if (!id) {
      res.json(Response.r(false, "id needs to be present"));
    }
    else {
      for (i = 0; i < restaurants.length; i++) {
        if (restaurants[i].id === id) {
          res.json(Response.r(true, null,{restaurant : restaurants[i]} ));
          break;
        }
      }
    }
};

exports.claim = function (req, res) {
    var id = req.body.id;

    if (!id) {
      res.json(Response.r(false, "id needs to be present"));
    }
    else {
      for (i = 0; i < restaurants.length; i++) {
        if (restaurants[i].id === id) {
          if (!restaurants[i].coupons[0].claimed) {
            restaurants[i].coupons[0].claimed = true;
            res.json(Response.r(true, null,{claimed : true} ));
            break;
          } else {
            res.json(Response.r(false, "Already Claimed"));
          }
        }
      }
    }
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

// exports.update = function (req, res) {
//   "use strict";
//   var restaurant;
//
//   try {
//     restaurant = req.body; // eslint-disable-line
//     model.update(restaurant, function (err, restaurant) {
//       if (err) {
//         logger.error(err, {
//           filePath: "api/users/controller",
//           functionName: "update",
//           msg: logMsg.getMessage(req, err)
//         });
//         res.json(Response.r(false, err, null));
//       } else {
//         logger.info({
//           filePath: "api/restaurants/controller",
//           functionName: "update",
//           msg: logMsg.getMessage(req, "success")
//         });
//         res.json(Response.r(true, null, restaurant));
//       }
//     });
//   } catch (e) {
//     logger.error(e, {
//       filePath: "api/restaurants/controller",
//       functionName: "update",
//       msg: logMsg.getMessage(req, e)
//     });
//     res.json(Response.r(false, {msg: e.toString()}, null));
//   }
// };
