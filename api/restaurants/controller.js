var model = require("./model"),
  logger = require("../../modules/logger"),
  logMsg = require("../utils/logger-message"),
  Response = require("../utils/Response"),
  Users = require("../users/index");


var restaurants = [
  {
      name : "Fresh Menu",
      id : "B1234",
      lat : 12.9321802,
      lng : 77.6129255,
      menu: [
        {
          name: "paneer slider",
          val: 150
        },
        {
          name: "exotic fish bowl",
          val: 250
        },
        {
          name: "The maiden cake",
          val: 100
        }
      ],
      coupons : [{
          claimed : false,
          id : "A12",
          name : "CheckIn offer",
          type : "checkin",
          description: "You can avail this coupon by checking into the restaurant",
          val: .02
        },
        {
          claimed: false,
          id: "B12",
          name: "Feedback Offer",
          type: "feedback",
          questions: [
            {
              question: "How do you find the paneer sliders here?",
              isAnswered: false
            },
            {
              question: "What do you think about our Brooklyn west pizza",
              isAnswered: false
            }
          ],
          description: "You can avail this coupon by giving feedback about the restaurant",
          val: .05
        }]
    },
    {
        name : "Paradise",
        id : "B1235",
        lat : 12.9341874,
        lng : 77.6299719,
        menu: [
          {
            name: "paneer butter masala",
            val: 209
          },
          {
            name: "chicken biyani",
            val: 245
          },
          {
            name: "mutton biyani",
            val: 295
          }
        ],
        coupons : [{
            id : "A13",
            claimed : false,
            name : "CheckIn offer",
            type : "checkin",
            description: "You can avail this coupon by checking into the restaurant",
            val: .18
          },
          {
            claimed: false,
            id: "B12",
            name: "Feedback Offer",
            type: "feedback",
            questions: [
              {
                question: "How do you find the chicken kebab here?",
                isAnswered: false
              },
              {
                question: "How do you find the mutton biryani here?",
                isAnswered: false
              }
            ],
            description: "You can avail this coupon by giving feedback about the restaurant",
            val: .51
          }]
    },
    {
      name : "KFC",
      id : "B1236",
      lat : 12.9375371,
      lng : 77.6269363,
      menu: [
        {
          name: "Fiery Grilled chicken bucket",
          val: 450
        },
        {
          name: "crusher",
          val: 100
        },
        {
          name: "zinga chicken meal",
          val: 200
        }
      ],

      coupons : [{
          id : "A14",
          claimed : true,
          name : "CheckIn offer",
          type : "checkin",
          description: "You can avail this coupon by checking into the restaurant",
          val: .17
        },
        {
          claimed: false,
          id: "B12",
          name: "Feedback Offer",
          type: "feedback",
          questions: [
            {
              question: "Is this the best grilled chicken restaurant or what?",
              isAnswered: false
            },
            {
              question: "How do you like the Krushers?",
              isAnswered: false
            }
          ],
          description: "You can avail this coupon by giving feedback about the restaurant",
          val: .51
        }]
    }
  ],
  clients = [],
  claimedClients = [];

  exports.claimedClients = function (req, res) {
    var restaurantId = req.query.restaurantId,
      i, finalArray = [];

    for (i = 0; i < clients.length; i++) {
      if (claimedClients[i].restaurantId === restaurantId) {
        finalArray.push(claimedClients[i]);
      }
    }

    res.json(Response.r(true, null,{clients : finalArray} ));
  };

  exports.getClients = function (req, res) {
    var restaurantId = req.query.restaurantId,
      i, finalArray = [];

    for (i = 0; i < clients.length; i++) {
      if (clients[i].restaurantId === restaurantId) {
        finalArray.push(clients[i]);
      }
    }

    res.json(Response.r(true, null,{clients : finalArray} ));
  };

  exports.postClients = function (req, res) {
    var q = req.body,
      i,
      insertObj = {};
      console.log("postclient: ", q);
      if (q.isAvailable.toString() === "true") {
        insertObj.clientId = q.clientId;
        insertObj.clientName = q.clientName;
        insertObj.restaurantId = q.restaurantId;
        clients.push(insertObj);
      } else {
        for (i = 0; i < clients.length; i++) {
          if ((clients[i].clientId === q.clientId) && (clients[i].restaurantId === q.restaurantId)) {
            clients.splice(i, 1);
            i--;
            break;
          }
        }
      }
      console.log(clients.length, clients);
      res.json(Response.r(true, null,{"clients length": clients.length} ));
  };

  //
  // exports.updateClients = function (req, res) {
  //   var clientId = req.body.clientId,
  //     i;
  //
  //     for (i = 0; i < clients.length; i++) {
  //       if (clients[i].clientId === clientId) {
  //         clients.splice(i, 1);
  //       }
  //     }
  //
  //     res.json(Response.r(true, null,{clients : clients} ));
  // };
  //
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

exports.claimFeedback = function (req, res) {
  var id = req.body.id,
    questionsAnswered = parseInt(req.body.questionsAnswered),
    val;

  if (!id || (questionsAnswered === undefined)) {
    res.json(Response.r(false, "id needs to be present"));
  }
  else {
    for (i = 0; i < restaurants.length; i++) {
      if (restaurants[i].id === id) {
        if (!restaurants[i].coupons[1].claimed) {
          restaurants[i].coupons[1].claimed = true;
          val = (questionsAnswered / restaurants[i].coupons[1].questions.length) * 100;
          Users.buyBitCoin(val, function(error, data) {
              if(error || !data)  return res.json(Response.r(false, "request failed"));
              res.json(Response.r(true, null,{data : data} ));
            });
          break;
        } else {
          res.json(Response.r(false, "Already Claimed"));
        }
      }
    }
  }
}

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
            claimedClients.push({
              clientId: req.body.clientId,
              clientName: req.body.clientName,
              restaurantId: id
            });
            restaurants[i].coupons[0].claimed = true;
            val = restaurants[i].coupons[0].val;
            Users.buyBitCoin(val, function(error, data) {
              console.log('yo', error, data);
              if(error || !data)  return res.json(Response.r(false, "request failed"));
              res.json(Response.r(true, null,{data : data} ));
            });
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
