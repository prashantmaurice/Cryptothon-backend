"use strict"; //eslint-disable-line

var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  restaurantSchema;

restaurantSchema = new Schema({
  restaurantName: {type: String, "default": null},
  location: {
    type: {
      type: String,
      required: true,
      "enum": ["Point", "LineString", "Polygon"],
      "default": "Point"
    },
    coordinates: [ Number ]
  },
  description: {type: String, "default": null},
  timestamp: {type: Number, "default": Date.now}
}, {collection: "Restaurants"});

module.exports = mongoose.model("Restaurants", restaurantSchema);
