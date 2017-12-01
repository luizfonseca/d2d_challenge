'use strict';

let path    = require("path");

module.exports = (app) => {
  let vehicleCtrl = require('../controllers/vehicleController.js');
  let vehicleLocationCtrl = require('../controllers/vehicleLocationController.js');

  // Root path
  app.route('/')
  .get((req, res) => {
    res.status(200).sendFile((path.join(`${__dirname}/../../public/index.html`)))
  })

  // Resources for Vehicles
  app.route('/vehicles')
  .get(vehicleCtrl.vehicle_list)
  .post(vehicleCtrl.vehicle_registration)


  // Resources for Vehicles/:id
  app.route('/vehicles/:id')
  .delete(vehicleCtrl.vehicle_deletion)


  // Resources for Locations
  app.route('/vehicles/:id/locations')
  .post(vehicleLocationCtrl.location_registration)
}
