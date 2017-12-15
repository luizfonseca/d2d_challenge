// See: specs/controllers
const mongoose = require('mongoose');

const Vehicle = mongoose.model('Vehicles');

/*
* GET /vehicles
* Wasnt required, but I found it usefull to know all
* active Vehicles
* '-id -__v' => I am excluding fields using the '-' (subtract) symbol.
*/
exports.vehicleList = (req, res) => {
  Vehicle.find({ status: 'active' }, '-_id -__v')
    .populate({
      path: 'locations',
      options: { limit: 10, sort: { at: -1 } },
      select: 'lat lng on_boundary at -_id',
    })
    .exec((err, vehicles) => {
      if (err) {
        res.send(err);
      }
      res.json(vehicles);
    });
};

/*
* POST /vehicles
* This method simply creates OR activate one Vehicle by using his ID
* And by default, they are all 'active' on creation
* unless HTTP DELETE is sent
*/
exports.vehicleRegistration = (req, res) => {

  if (req.body.id === undefined) {
    return renderBody("Missing required fields", res)

  } else {
    // Finding existing Vehicles
    // If found, we just update his status to active
    // Otherwise, we create it
    Vehicle.findOrCreate({ id: req.body.id }, (err, vehicle, created) => {
      if (!created) { vehicle.set({status: 'active'}).save() };

      return renderBody(err, res)
    })
  }
}


// DELETE /vehicles/:id
// This function just make one of the Vehicles inactive
// If found
exports.vehicleDeletion = (req, res) => {
  Vehicle.findOneAndUpdate({ id: req.params.id }, { status: 'inactive' }, { new: true }, (err, vehicle) => {
    renderBody(err, res)
  })

}

// Just returns 400 or 204 depending on Resources
// Validation
let renderBody = (err, res) => {
  var status = err ? 400 : 204,
  body = err || null

  // Try to save
  // If fail: HTTP 400 (bad request)
  // If success: HTTP 204 (No content, success)
  return res.status(status).json(null)
}
