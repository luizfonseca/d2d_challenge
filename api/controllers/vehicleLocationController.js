// See: specs/controllers
const geolib = require('geolib');
const mongoose = require('mongoose');

const Vehicle = mongoose.model('Vehicles');
const VehicleLocation = mongoose.model('VehicleLocations');


// Method that check if the point being sent from the
// vehicle is still on city boundaries.
// Return true or false
const isInOfficeBoundary = (vehicleLat, vehicleLng) => {
  // [true, false, false]
  const boundaries = [
    { lat: 52.53, lng: 13.403 },
    { lat: 52.50, lng: 13.228 },
    { lat: 52.45, lng: 13.391 },
  ];

  const checkedBoundaries = boundaries.map((bound) => {
    const distance = geolib.getDistance(
      { latitude: bound.lat, longitude: bound.lng },
      { latitude: vehicleLat, longitude: vehicleLng },
    );

    return (distance <= 3500);
  });


  // Check if its at least 3,5KM or 3500 mts from office position
  return checkedBoundaries.some(el => el);
};


// POST /vehicles/:id/locations
const locationRegistration = (req, res) => {
  Vehicle.findOne(req.params, (err, vehicle) => {
    let calcBoundary = false;

    if (vehicle && vehicle.status.toString() === 'active') {
      // Merging the Body data with the request
      // Using the ES6 "extend" option.

      if (req.body.lat && req.body.lng) {
        calcBoundary = isInOfficeBoundary(req.body.lat, req.body.lng);
      }

      const mergeData = Object.assign(req.body, {
        vehicle_id: vehicle.id, on_boundary: calcBoundary,
      });

      // TODO: refactor this part to a more readable way.
      VehicleLocation.create(mergeData, (err2) => {
        if (err2) {
          res.status(400).json(err2);
        } else {
          res.status(204).json(null);
        }
      });
    } else {
      res.status(400).json(null);
    }
  });
};


module.exports = { isInOfficeBoundary, locationRegistration };
