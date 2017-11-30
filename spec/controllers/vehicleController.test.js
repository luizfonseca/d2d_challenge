// Specs for the Vehicle Registration/Listing controller
let mongoose    = require('mongoose');
let request     = require('supertest');
let Vehicle     = require('../../api/models/vehicleModel')
let vehicleCtrl = require('../../api/controllers/vehicleController');
let app         = require('../../app');

mongoose.connect('mongodb://localhost/d2dchallenge_test', { useMongoClient: true });

afterAll(async () => {
  await Vehicle.remove({})
});

// GET /vehicles
describe(">> GET /vehicles", () => {

  test("should see a list of active vehicles", (done) => {
    var data   = { id: "one" }
    Vehicle.findOrCreate(data, (err, vehicle, created) => {

      request(app).get('/vehicles').then((response) => {
        expect(JSON.stringify(response.body)).toMatch('\"id\":\"one\"')
        done()
      })
    })
  })
})



// POST /vehicles
describe(">> POST /vehicles", () => {

  test('should return HTTP 204 if the data being sent is valid', (done) => {
    // Valid data (id)
    var bodyReq = { id: "ID" }


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
    Vehicle.findOrCreate(bodyReq, (err, vehicle) => {


      request(app).post('/vehicles').send(bodyReq).then((response) => {
        Vehicle.count({ id: "niceID" }, (err, count) => {
          expect(count).toBe(1)
          done()
        })
      })
    })
  })
})





// DELETE /vehicles/:id
describe(">> DELETE /vehicles/:id", () => {

  test("should deactivate an item if a valid ID is given", (done) => {
    var data = { id: "id_inactive" }
    Vehicle.findOrCreate(data, (err, vehicle, created) => {
      request(app).delete('/vehicles/id_inactive').then((response) => {
        expect(response.statusCode).toBe(204)

        Vehicle.findOne({ id: 'id_inactive' }, (err, vehicle) => {
          expect(vehicle.status[0]).toBe("inactive")
          done()
        })
      })
    })
  })
})
