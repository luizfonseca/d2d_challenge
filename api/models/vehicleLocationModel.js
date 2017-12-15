'use strict';


const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;



const VehicleLocationSchema = new Schema({
  vehicle_id: {
    type: String,
    required: "You need an Vehicle UUID",
    index: true,
  },

  lat: {
    type: Number,
    required: "Latitude is required"
  },

  lng: {
    type: Number,
    required: "Longitude is required"
  },

  at: {
    type: Date,
    required: "Timestamp of the Location is required"
  },

  on_boundary: {
    type: Boolean,
    default: false
  }
})


module.exports = mongoose.model('VehicleLocations', VehicleLocationSchema);
