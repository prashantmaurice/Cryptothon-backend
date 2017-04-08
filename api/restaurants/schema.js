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
    coordinates: {
      type: [ Number ],
      "default": [0, 0]
    }
  },
  coupons: [
    {
      label: {type: String, "default": null},
      claimed: {type: Boolean, "default": false}
    }
  ],
  description: {type: String, "default": null},
  timestamp: {type: Number, "default": Date.now}
}, {collection: "Restaurants"});

restaurantSchema.index({location: "2dsphere"});
module.exports = mongoose.model("Restaurants", restaurantSchema);
