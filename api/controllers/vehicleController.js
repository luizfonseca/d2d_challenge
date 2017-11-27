// See: specs/controllers
'use strict';


let mongoose = require('mongoose'),
Vehicle = mongoose.model('Vehicles');

/**
* GET /vehicles
* Wasnt required, but I found it usefull to know all
* active Vehicles
* '-id -__v' => I am excluding fields using the '-' symbol.
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
  console.log(req.body)
  Vehicle.findOne({ id: req.body.id }, (err, vehicle) => {
    console.log(vehicle)
    if (vehicle) {
      vehicle.set({ status: 'active' })
      save_vehicle(vehicle, res);

    } else {
      var new_vehicle = new Vehicle(req.body);
      // Try to save
      // If fail: HTTP 400 (bad request)
      // If success: HTTP 204 (No content, success)
      save_vehicle(new_vehicle, res);

    }
  })


}


let save_vehicle = (vh, res) => {
  vh.save((err, vehicle) => {
    var status = err ? 400 : 204,
    body = err || null

    res.status(status).send(body)
  })
}
