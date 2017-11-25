// Specs for the Vehicle Registration/Listing controller
const mongoose = require('mongoose');

const request = require('supertest');
const Vehicle = require('../../api/models/vehicleModel')
const vehicleCtrl = require('../../api/controllers/vehicleController');
const app = require('../../app');

mongoose.connect('mongodb://localhost/d2dchallenge_test', { useMongoClient: true });
Vehicle.remove({})


describe("Vehicle Registration", () => {

  test('should return HTTP 204 and increase if the data being sent is valid', (done) => {
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

})




describe("Vehicle Listing", () => {

  test("should see a list of active vehicles", (done) => {
    var data   = [{ id: "one" }]
    var sample = new Vehicle(data).save((err) => { });

    request(app).get('/vehicles').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(JSON.stringify(response.body)).toMatch('\"id\":\"one\"')
      done()
    })
  })


})
