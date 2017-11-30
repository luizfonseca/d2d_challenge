// See: specs/controllers
'use strict';


let mongoose  = require('mongoose'),
    Vehicle   = mongoose.model('Vehicles'),
    geolib    = require('geolib'),
    VehicleLocation = mongoose.model('VehicleLocations');



// POST /vehicles/:id/locations
exports.location_registration = (req, res) => {

  //isInOfficeBoundary(req.body.lat, req.body.lng)

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


// Method that check if the point being sent from the
// vehicle is still on city boundaries.
// Return true or false
exports.isInOfficeBoundary = (vehicleLat, vehicleLng) => {
  let officeLat = 52.53,
      officeLng = 13.403;



  // Return distance in meters
  let distanceInMeters = geolib.getDistance(
    { latitude: officeLat, longitude: officeLng },
    { latitude: vehicleLat, longitude: vehicleLng },
    100, // accuracy in meters
  )

  console.log(`Vehicle is at ${distanceInMeters} meters from Office`)


  // Check if its at least 3,5KM or 3500 mts from office position
  return (distanceInMeters <= 3500)



}
