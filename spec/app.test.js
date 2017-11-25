// Spec to just test we are actually up and running

const request = require('supertest')
const app = require('../app')


describe("Root path access", () => {
  test('status code should be 200', () => {

    return request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
    })


  })

})
