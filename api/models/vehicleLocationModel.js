'use strict';


const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;



const VehicleLocationSchema = new Schema({
  vehicle_id: {
    type: String,
    required: "You need an Vehicle UUID"
  },

  latitude: {
    type: Number,
    required: "Latitude is required"
  },

  longitude: {
    type: Number,
    required: "Longitude is required"
  }


})


module.exports = mongoose.model('VehicleLocations', VehicleLocationSchema);
