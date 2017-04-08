"use strict"; //eslint-disable-line

var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  restaurantSchema;

restaurantSchema = new Schema({
  restaurantName: {type: String, "default": null},
  location: {
    type: "Point",
    coordinates: []
  },
  description: {type: String, "default": null},
  timestamp: {type: Number, "default": Date.now}
}, {collection: "Events"});

module.exports = mongoose.model("Event", restaurantSchema);
