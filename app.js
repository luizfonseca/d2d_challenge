//app.js
const express = require('express'),
  app         = express(),
  bodyParser  = require('body-parser'),
  mongoose    = require('mongoose'),
  Vehicle     = require('./api/models/vehicleModel'),
  VehicleLocation = require('./api/models/vehicleLocationModel');


mongoose.Promise = global.Promise;

// Change process.env.MONGODB_URI to
// your environment variable if needed
let mongoURI = process.env.MONGODB_URI || "mongodb://localhost/d2dchallenge"
mongoose.connect(mongoURI, { useMongoClient: true });

// Body Parser is needed because Express doesn't come
// with it anymore
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/vehicleRoutes'); //importing route
routes(app);

module.exports = app
