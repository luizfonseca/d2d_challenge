// Specs for the Vehicle Location Registration
const app = require('../../app');
const mongoose = require('mongoose');
const request = require('supertest');
const Vehicle = require('../../api/models/vehicleModel');
const VehicleLocation = require('../../api/models/vehicleLocationModel');
const vehicleCtrl = require('../../api/controllers/vehicleLocationController');

mongoose.connect('mongodb://localhost/d2dchallenge_test', { useMongoClient: true });



afterAll(async () => {
  await VehicleLocation.remove({})
});

// POST /vehicles
describe(">> POST /vehicles/:id/locations", () => {

  test('should create a new location record for a given vehicle ID', (done) => {
    Vehicle.findOrCreate({ id: "abc123" }, (err, vehicle, created) => {

      var bodyReq = { "lat": 52.53, "lng": 13.400, "at": "2017-09-01T12:00:00Z" }
      request(app).post('/vehicles/abc123/locations').send(bodyReq).then((response) => {
        expect(response.statusCode).toBe(204)
        VehicleLocation.count({ vehicle_id: "abc123" }, (err, count) => {
          expect(count).not.toBe(0)
          done()
        })
      })
    })
  })


  test('should say if the location is on boundary or not', (done) => {
    var bodyReq = { "lat": 52.53, "lng": 13.395, "at": "2017-09-01T12:00:00Z" }

    request(app).post('/vehicles/abc123/locations').send(bodyReq).then((response) => {
      expect(response.statusCode).toBe(204)
      VehicleLocation.findOne({ vehicle_id: "abc123" }, (err, location) => {
        expect(location.on_boundary).toBe(true)
        done()
      })
    })

  })


  test('should throw error if required fields are missing', (done) => {
    request(app).post('/vehicles/abc123/locations').send({ 'lat': null, 'lng': ''}).then((response) => {
      expect(response.statusCode).toBe(400)
      done()
    })
  })


  test('should not accept any location data if the vehicle is not active', (done) => {
    Vehicle.findOrCreate({ id: "abc1234", status: 'inactive' })

    var bodyReq = { "lat": 10.0, "lng": 20.0, "at": "2017-09-01T12:00:00Z" }
    request(app).post('/vehicles/abc1234/locations').send(bodyReq).then((response) => {
      expect(response.statusCode).toBe(400)
      done()
    })
  })
})



describe('.isInOfficeBoundary', () => {

  // { lat: 52.53, lng: 13.403 },
  // { lat: 52.50, lng: 13.228 },
  // { lat: 52.45, lng: 13.391 }

  test('Should return true if the Vehicle is close to the office perimeter', () => {
    let lat = 52.52, lng = 13.450;
    expect(vehicleCtrl.isInOfficeBoundary(lat, lng)).toBe(true)
  })

  test('Should return true if the Vehicle is close to the second office perimeter', () => {
    let lat = 52.501, lng = 13.215;
    expect(vehicleCtrl.isInOfficeBoundary(lat, lng)).toBe(true)
  })

  test('Should return true if the Vehicle is close to the third office perimeter', () => {
    let lat = 52.45, lng = 13.385;
    expect(vehicleCtrl.isInOfficeBoundary(lat, lng)).toBe(true)
  })

  test('should return false if the Vehicle is not any perimeters', () => {
    let lat = 12, lng = 13;
    expect(vehicleCtrl.isInOfficeBoundary(lat, lng)).toBe(false)
  })
})
