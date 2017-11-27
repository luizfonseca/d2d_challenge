// Specs for the Vehicle Registration/Listing controller
let mongoose = require('mongoose');
let request = require('supertest');
let Vehicle = require('../../api/models/vehicleModel')
let vehicleCtrl = require('../../api/controllers/vehicleController');
let app = require('../../app');

mongoose.connect('mongodb://localhost/d2dchallenge_test', { useMongoClient: true });
Vehicle.find({}, (err, vehicles) => {
  console.log(vehicles)
})
// POST /vehicles
describe("Vehicle Registration", () => {

  test('should return HTTP 204 if the data being sent is valid', (done) => {
    // Valid data (id)
    var bodyReq = { id: "SampleID" }


    // Using done() instead of return due to sometimes using more
    // than one expectation
    request(app).post('/vehicles').send(bodyReq).then((response) => {
      expect(response.statusCode).toBe(204)
      done()
    })

  })


  test('should return error if required fields are missing', (done) => {
    // Invalid data (invalid_field is not a valid data input)
    var bodyReq = { invalid_field: "sampleID" }

    request(app).post('/vehicles').send(bodyReq).then((response) => {
      expect(response.statusCode).toBe(400)
      done()
    })

  })



  test('should not create the same Vehicle twice', (done) => {
    var bodyReq = { id: "niceID" }
    var existing_vehicle = Vehicle(bodyReq).update()

    request(app).post('/vehicles').send(bodyReq).then((response) => {
      Vehicle.count({ id: "niceID" }, (err, count) => {
        expect(count).toBe(1)
        done()
      })
    })
  })
})



// GET /vehicles
describe("Vehicle Listing", () => {

  test("should see a list of active vehicles", (done) => {
    var data   = { id: "one" }
    var sample = new Vehicle(data).save();

    request(app).get('/vehicles').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(JSON.stringify(response.body)).toMatch('\"id\":\"one\"')
      done()
    })
  })
})
