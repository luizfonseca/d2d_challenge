const request = require('supertest');
const Vehicle = require('../../api/models/vehicleModel')
const vehicleCtrl = require('../../api/controllers/vehicleController');
const app = require('../../app');



describe("Vehicle Registration", () => {
  test('should respond with 204 status code', () => {
    return request(app).post('/vehicles').then((response) => {
      expect(response.statusCode).toBe(204);
    })
  })

  test('should increase the number of active Vehicles to +1', () => {
    return request(app).post('/vehicles').then((response) => {
      expect(Vehicle.count().exec().then((count) => { return count })).toBe(1)
    })
  })

})
