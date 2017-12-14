// See: specs/controllers
'use strict';


let mongoose  = require('mongoose'),
    Vehicle   = mongoose.model('Vehicles'),
    geolib    = require('geolib'),
    VehicleLocation = mongoose.model('VehicleLocations');



// POST /vehicles/:id/locations
let location_registration = (req, res) => {

  //isInOfficeBoundary(req.body.lat, req.body.lng)

  Vehicle.findOne(req.params, (err, vehicle) => {
    if (vehicle && vehicle.status == 'active') {
      // Merging the Body data with the request
      // Using the ES6 "extend" option.

      var calcBoundary = false;

      if (req.body.lat && req.body.lng) {
        calcBoundary  = isInOfficeBoundary(req.body.lat, req.body.lng)
      }
      var mergeData     = Object.assign(req.body, { vehicle_id: vehicle.id, on_boundary: calcBoundary })

      // TODO: refactor this part to a more readable way.
      VehicleLocation.create(mergeData, (err, location) => {
        if (err) {
          return res.status(400).json(err)
        }
        res.status(204).json(null)
      })
    } else {
      res.status(400).json(null)
    }
  })


}


// Method that check if the point being sent from the
// vehicle is still on city boundaries.
// Return true or false
let isInOfficeBoundary = (vehicleLat, vehicleLng) => {




  // [true, false, false]
  let boundaries = [
    { lat: 52.53, lng: 13.403 },
    { lat: 52.50, lng: 13.228 },
    { lat: 52.45, lng: 13.391 }
  ]

  let checkedBoundaries = boundaries.map((bound) => {
    var distance = geolib.getDistance(
      { latitude: bound.lat, longitude: bound.lng },
      { latitude: vehicleLat, longitude: vehicleLng },100)

    return (distance <= 3500)

  })

  //console.log(checkedBoundaries);


  // Check if its at least 3,5KM or 3500 mts from office position
  return checkedBoundaries.some((el) => { return el } );
}


module.exports = { isInOfficeBoundary, location_registration }
