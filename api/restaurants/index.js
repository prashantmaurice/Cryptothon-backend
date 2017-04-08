"use strict"; // eslint-disable-line

var express = require("express"),
  controller = require("./controller"),
  router = express.Router(); // eslint-disable-line

// get events
router.get("/", controller.getRestaurants);

// register events
router.post("/register", controller.register);

module.exports = router;
