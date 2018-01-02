const findOrCreate = require('mongoose-findorcreate');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');


const VehicleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: 'Missing UUID',
    unique: true,
    dropDups: true,
  },

  status: {
    type: [{
      type: String,
      enum: ['active', 'inactive'],
    }],
    default: 'active',
  },
}, { toJSON: { virtuals: true } });


VehicleSchema.virtual('locations', {
  ref: 'VehicleLocations',
  localField: 'id',
  foreignField: 'vehicle_id',
  justOne: false,
});


VehicleSchema.plugin(findOrCreate);
VehicleSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Vehicles', VehicleSchema);
