// See: specs/controllers
'use strict';


let mongoose = require('mongoose'),
Vehicle = mongoose.model('Vehicles');

/**
* GET /vehicles
* Wasnt required, but I found it usefull to know all
* active Vehicles
* '-id -__v' => I am excluding fields using the '-' (subtract) symbol.
**/
exports.vehicle_list = (req, res) => {
  Vehicle.find({}, '-_id -__v', (err, vehicle) => {

    if (err) {
      res.send(err)
    }
    res.json(vehicle)
  })
}

/**
* POST /vehicles
* This method simply creates OR activate one Vehicle by using his ID
* And by default, they are all 'active' on creation
* unless HTTP DELETE is sent
**/
exports.vehicle_registration = (req, res) => {

  // Finding existing Vehicles
  // If found, we just update his status to active
  // Otherwise, we create it
  Vehicle.findOne({ id: req.body.id }, (err, vehicle) => {

    if (vehicle) {
      // Existing vehicle? Just activate it
      var vehicleObject = vehicle.set({ status: 'active' })

    } else {
      // New vehicle? Create it
      var vehicleObject = new Vehicle(req.body);
    }


    // See:  Function[] save_vehicle
    save_vehicle(vehicleObject, res);
  })
}


// DELETE /vehicles/:id
// This function just make one of the Vehicles inactive
// If found
exports.vehicle_deletion = (req, res) => {
  Vehicle.findOneAndUpdate({ id: req.params.id }, { status: 'inactive' },  (err, vehicle) => {
    render_body(err, res)
  })


}




// Small abstraction so we dont need to return/call
// function more than once
let save_vehicle = (vh, res) => {
  vh.save((err, vehicle) => {
    render_body(err, res)
  })
}

// Just returns 400 or 204 depending on Resources
// Validation
let render_body = (err, res) => {
  var status = err ? 400 : 204,
  body = err || null

  // Try to save
  // If fail: HTTP 400 (bad request)
  // If success: HTTP 204 (No content, success)
  res.status(status).send(body)
}
