'use strict';


const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;



const VehicleLocationSchema = new Schema({
  vehicle_id: {
    type: String,
    required: "You need an Vehicle UUID"
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
    require: "Timestamp of the Location is required"
  },

  on_boundary: {
    type: Boolean
  }
})


module.exports = mongoose.model('VehicleLocations', VehicleLocationSchema);
