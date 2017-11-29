// See: specs/controllers
'use strict';


let mongoose = require('mongoose'),
    Vehicle = mongoose.model('Vehicles'),
    VehicleLocation = mongoose.model('VehicleLocations');



// POST /vehicles/:id/locations
exports.location_registration = (req, res) => {

  Vehicle.findOne(req.params, (err, vehicle) => {
    if (vehicle && vehicle.status == 'active') {
      // Merging the Body data with the request
      // Using the ES6 "extend" option.

      var mergeData = Object.assign(req.body, { vehicle_id: vehicle.id })

      // TODO: refactor this part to a more readable way.
      VehicleLocation.create(mergeData, (err, location) => {
        if (err) {
          return res.status(400).send(err)
        }
        res.status(204).send(null)
      })
    } else {
      res.status(400).send(null)
    }
  })


}
