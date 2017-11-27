'use strict';

const findOrCreate = require('mongoose-findorcreate')
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;



const VehicleSchema =  new Schema({
  id: {
    type: String,
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

VehicleSchema.plugin(findOrCreate);

module.exports = mongoose.model('Vehicles', VehicleSchema);
