'use strict';


module.exports = (app) => {
  const vehicleCtrl = require('../controllers/vehicleController.js');

  app.route('/')
    .get((req, res) => {
      res.status(200).send('VehicleLocation Running')
    })


  app.route('/vehicles')
    .get(vehicleCtrl.vehicle_list)
    .post(vehicleCtrl.vehicle_registration)

}
