"use strict"; // eslint-disable-line

var express = require("express"),
  controller = require("./controller"),
  router = express.Router(); // eslint-disable-line

// get events
router.get("/", controller.getRestaurants);
router.get("/id", controller.getRestaurant);
router.get("/test", controller.testUnocoin);
router.get("/clients", controller.getClients);
router.post("/clients", controller.postClients);
// router.put("/clients", controller.updateClients);


// register events
router.post("/claim", controller.claim);
router.post("/claimFeedback", controller.claimFeedback);
router.post("/register", controller.register);
router.put("/register", controller.register);

module.exports = router;
