'use strict';

let findOrCreate = require('mongoose-findorcreate')
let uniqueValidator = require('mongoose-unique-validator')
let mongoose  = require('mongoose');
let Schema    = mongoose.Schema;



let VehicleSchema =  new Schema({
  id: {
    type: String,
    required: "Missing UUID",
    unique: true,
    dropDups: true
  },

  status: {
    type: [{
      type: String,
      enum: ['active', 'inactive']
    }],
    default: 'active'
  }
},  { toJSON: { virtuals: true } })


VehicleSchema.virtual('locations', {
  ref: 'VehicleLocations',
  localField: 'id',
  foreignField: 'vehicle_id',
  justOne: false

})


VehicleSchema.plugin(findOrCreate);
VehicleSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Vehicles', VehicleSchema);
