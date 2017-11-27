// Specs for the Vehicle Registration/Listing controller
let mongoose = require('mongoose');
let request = require('supertest');
let Vehicle = require('../../api/models/vehicleModel')
let vehicleCtrl = require('../../api/controllers/vehicleController');
let app = require('../../app');

mongoose.connect('mongodb://localhost/d2dchallenge_test', { useMongoClient: true });

// POST /vehicles
describe("Vehicle Registration", () => {

  test('should return HTTP 204 if the data being sent is valid', () => {
    // Valid data (id)
    var bodyReq = { id: "SampleID" }


    // Using done() instead of return due to sometimes using more
    // than one expectation
    return request(app).post('/vehicles').send(bodyReq).then((response) => {
      expect(response.statusCode).toBe(204)
    })

  })


  test('should return error if required fields are missing', () => {
    // Invalid data (invalid_field is not a valid data input)
    var bodyReq = { invalid_field: "sampleID" }

    return request(app).post('/vehicles').send(bodyReq).then((response) => {
      expect(response.statusCode).toBe(400)
    })

  })



  test('should not create the same Vehicle twice', () => {
    var bodyReq = { id: "niceID" }
    var existing_vehicle = Vehicle.findOrCreate(bodyReq, (err, vehicle, created) => {})

    return request(app).post('/vehicles').send(bodyReq).then((response) => {
      Vehicle.count({ id: "niceID" }, (err, count) => {
        expect(count).toBe(1)
      })
    })
  })
})



// GET /vehicles
describe("Vehicle Listing", () => {

  test("should see a list of active vehicles", () => {
    var data   = { id: "one" }
    var existing_vehicle = Vehicle.findOrCreate(data, (err, vehicle, created) => {})

    return request(app).get('/vehicles').then((response) => {
      expect(response.statusCode).toBe(200)
      expect(JSON.stringify(response.body)).toMatch('\"id\":\"one\"')
    })
  })
})




// DELETE /vehicles/:id
describe("Vehicle Deletion/Deactivation", () => {

  test("should deactivate an item if a valid ID is given", (done) => {
    var data = { id: "id_inactive" }
    var sample = Vehicle.findOrCreate(data, (err, vehicle, created) => {})


    request(app).delete('/vehicles/id_inactive').then((response) => {
      expect(response.statusCode).toBe(204)
      Vehicle.findOne({ id: 'id_inactive' }, (err, vehicle) => {
        expect(vehicle.status[0]).toBe("inactive")
        done()
      })
    })
  })

})
