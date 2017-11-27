'use strict';


module.exports = (app) => {
  let vehicleCtrl = require('../controllers/vehicleController.js');

  // Root path
  app.route('/')
    .get((req, res) => {
      res.status(200).send('VehicleLocation Running')
    })

  // Resources for Vehicles
  app.route('/vehicles')
    .get(vehicleCtrl.vehicle_list)
    .post(vehicleCtrl.vehicle_registration)


  // Resources for Vehicles/:id
  app.route('/vehicles/:id')
    .delete(vehicleCtrl.vehicle_deletion)
}
