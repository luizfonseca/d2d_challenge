// Specs for the Vehicle Location Registration
let app             = require('../../app');
let mongoose        = require('mongoose');
let request         = require('supertest');
let Vehicle         = require('../../api/models/vehicleModel')
let VehicleLocation = require('../../api/models/vehicleLocationModel')
let vehicleCtrl     = require('../../api/controllers/vehicleLocationController');

mongoose.connect('mongodb://localhost/d2dchallenge_test', { useMongoClient: true });

// POST /vehicles
describe(">> POST /vehicles/:id/locations", () => {

  test('should create a new location record for a given vehicle ID', () => {
    Vehicle.findOrCreate({ id: "abc123" })

    var bodyReq = { "lat": 10.0, "lng": 20.0, "at": "2017-09-01T12:00:00Z" }
    return request(app).post('/vehicles/abc123/locations').send(bodyReq).then((response) => {
      expect(response.statusCode).toBe(204)
      VehicleLocation.count({ vehicle_id: "abc123" }, (err, count) => {
        expect(count).not.toBe(0)
      })
    })

  })


  test('should throw error if required fields are missing', () => {
    return request(app).post('/vehicles/abc123/locations').send({ lat: '', lng: ''}).then((response) => {
      expect(response.statusCode).toBe(400)
    })

  })


  test('should not accept any location data if the vehicle is not active', () => {
    Vehicle.findOrCreate({ id: "abc1234", status: 'inactive' })

    var bodyReq = { "lat": 10.0, "lng": 20.0, "at": "2017-09-01T12:00:00Z" }
    return request(app).post('/vehicles/abc1234/locations').send(bodyReq).then((response) => {
      expect(response.statusCode).toBe(400)
    })
  })
})
