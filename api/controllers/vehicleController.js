'use strict';


const mongoose = require('mongoose'),
  Vehicle = mongoose.model('Vehicles');




// POST /vehicles
exports.vehicle_registration = (req, res) => {
  res.status(204).json({})
}
