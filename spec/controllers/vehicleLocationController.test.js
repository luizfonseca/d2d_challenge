// Specs for the Vehicle Location Registration
let app             = require('../../app');
let mongoose        = require('mongoose');
let request         = require('supertest');
let Vehicle         = require('../../api/models/vehicleModel')
let VehicleLocation = require('../../api/models/vehicleLocationModel')
let vehicleCtrl     = require('../../api/controllers/vehicleLocationController');

mongoose.connect('mongodb://localhost/d2dchallenge_test', { useMongoClient: true });



afterAll(async () => {
  await VehicleLocation.remove({})
});




// POST /vehicles
describe(">> POST /vehicles/:id/locations", () => {

  test('should create a new location record for a given vehicle ID', (done) => {
    Vehicle.findOrCreate({ id: "abc123" }, (err, vehicle, created) => {

      var bodyReq = { "lat": 10.0, "lng": 20.0, "at": "2017-09-01T12:00:00Z" }
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
    var bodyReq = { "lat": 22.0, "lng": 20.0, "at": "2017-09-01T12:00:00Z" }

    request(app).post('/vehicles/abc123/locations').send(bodyReq).then((response) => {
      expect(response.statusCode).toBe(204)
      VehicleLocation.findOne({ vehicle_id: "abc123" }, (err, location) => {
        expect(location.on_boundary).toBe(false)
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

  test('Should return true if the Vehicle is close to the office perimeter', () => {
    var lat = 52.52, lng = 13.450;

    expect(vehicleCtrl.isInOfficeBoundary(lat, lng)).toBe(true)
  })


  test('should return false if the Vehicle is not on the office perimeter (3,5KM)', () => {
    var lat = 52.45, lng = 13.400;
    expect(vehicleCtrl.isInOfficeBoundary(lat, lng)).toBe(false)
  })
})
