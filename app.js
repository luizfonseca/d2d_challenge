//app.js
const express = require('express'),
  app         = express(),
  bodyParser  = require('body-parser'),
  mongoose    = require('mongoose'),
  Vehicle     = require('./api/models/vehicleModel'),
  VehicleLocation = require('./api/models/vehicleLocationModel');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/d2dchallenge', { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/vehicleRoutes'); //importing route
routes(app);

module.exports = app
