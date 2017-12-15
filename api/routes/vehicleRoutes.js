const path = require('path');
const vehicleCtrl = require('../controllers/vehicleController.js');
const vehicleLocationCtrl = require('../controllers/vehicleLocationController.js');

module.exports = (app) => {
  // Root path
  app.route('/')
    .get((req, res) => {
      res.status(200).sendFile((path.join(`${__dirname}/../../public/index.html`)));
    });

  // Resources for Vehicles
  app.route('/vehicles')
    .get(vehicleCtrl.vehicleList)
    .post(vehicleCtrl.vehicleRegistration);


  // Resources for Vehicles/:id
  app.route('/vehicles/:id')
    .delete(vehicleCtrl.vehicleDeletion);


  // Resources for Locations
  app.route('/vehicles/:id/locations')
    .post(vehicleLocationCtrl.locationRegistration);
};
