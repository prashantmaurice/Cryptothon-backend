var Restaurant = require("./schema"),
  logger = require("../../modules/logger");

exports.getRestaurants = function (queryParams, callback) {
  "use strict";
  var q = {};

  try {
    if (queryParams.lat && queryParams.long) {
      q.coordinates = [];
      q.coordinates.push(parseFloat(queryParams.lat));
      q.coordinates.push(parseFloat(queryParams.long));
    }

    console.log(q.coordinates);

    Restaurant.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: q.coordinates },
          distanceField: "dist.calculated",
          maxDistance: 2,
          query: { type: "public" },
          num: 5,
          spherical: true
        }
      }
    ], function (err, restaurants) {
      console.log(err, restaurants);
      callback(null, {restaurants: restaurants});
    });

    // Restaurant.find({
    //   loc: {
    //     $geoWithin: {
    //       $centerSphere: [q.coordinates, 100 / 6378.1]
    //     }
    //   }
    // }).exec(function (err, restaurants) {
    //   callback(null, {restaurants: restaurants});
    // });
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
