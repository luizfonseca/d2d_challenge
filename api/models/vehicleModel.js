'use strict';


const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;



const VehicleSchema =  new Schema({
  id: {
    type: String,
    default: "",
    required: "An UUID is required"
  },

  status: {
    type: [{
      type: String,
      enum: ['active', 'inactive']
    }],
    default: 'active'

  }
})


module.exports = mongoose.model('Vehicles', VehicleSchema);
