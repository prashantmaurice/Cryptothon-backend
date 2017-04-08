var Restaurant = require("./schema"),
  logger = require("../../modules/logger");

exports.getRestaurants = function (queryParams, callback) {
  "use strict";
  var q = {};

  try {
    if (queryParams.location) {
      q.location = queryParams.location;
    }

    Restaurant.find(q)
      .sort({"timestamp.created_at": -1})
      .exec(function (err, restaurant) {
        if (err || !restaurant) {
          logger.error(err, {
            filePath: "api/restaurants/service",
            functionName: "getRestaurants",
            msg: err
          });
          callback({msg: "Restaurants not found"}, null);
        } else {
          Restaurant.count(q, function (err, restaurantCount) {
            if (err) {
              logger.error(err, {
                filePath: "api/clients/service",
                functionName: "getRestaurants",
                msg: err
              });
              callback({msg: "db err occurred. Please try again"}, null);
            } else {
              logger.info({
                filePath: "api/clients/service",
                functionName: "getRestaurants",
                msg: "success"
              });
              callback(null, {totalCount: restaurantCount, restaurant: restaurant});
            }
          });
        }
      });
  } catch (e) {
    logger.error(e, {
      filePath: "api/restaurants/service",
      functionName: "getRestaurants",
      msg: e
    });
    callback({msg: e.toString()}, null);
  }
};

exports.register = function (req, callback) {
  "use strict";
  var insertObject = {};

  if (!req) {
    logger.debug({
      filePath: "api/restaurants/service",
      functionName: "register",
      msg: "no data to register"
    });
    callback({msg: "userId, videoId, restaurant should be present"}, null);
  } else if (!req.restaurantName) {
    logger.debug({
      filePath: "api/restaurants/service",
      functionName: "register",
      msg: "restaurantName not found"
    });
    callback({msg: "restaurantName should be present"}, null);
  } else if (!req.location) {
    logger.debug({
      filePath: "api/restaurants/service",
      functionName: "register",
      msg: "location not found"
    });
    callback({msg: "location should be present"}, null);
  } else {
    insertObject.restaurantName = req.restaurantName;
    insertObject.description = req.description;
    insertObject.location = {};
    if (req.location.type) {
      insertObject.location.type = req.location.type;
    }
    if (req.location.coordinates && req.location.coordinates.length === 2) {
      insertObject.location.coordinates = req.location.coordinates;
    } else {
      callback({msg: "location coordinates hould be present"}, null);
    }

    logger.info({
      filePath: "api/restaurants/service",
      functionName: "register",
      msg: "insert object - " + JSON.stringify(insertObject)
    });


    console.log(insertObject);
    Restaurant.create(insertObject, function (err, restaurant) {
      if (err || !restaurant) {
        logger.error(err, {
          filePath: "api/restaurants/service",
          functionName: "register",
          msg: err
        });
        callback({msg: "err occurred. Please try again"}, null);
      } else {
        logger.info({
          filePath: "api/restaurants/service",
          functionName: "register",
          msg: "success"
        });

        callback(null, {restaurant: restaurant});
      }
    });
  }
};
