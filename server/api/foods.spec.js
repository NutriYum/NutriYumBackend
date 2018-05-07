/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Foods = db.model('foods')

describe('Foods routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/foods/', () => {
    const Apple = 'Apple'

    beforeEach(() => {
      return Foods.create({
        name: Apple
      })
    })

    it('should list all foods on /foods GET', () => {
      return request(app)
        .get('/api/foods')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(Apple)
        })
    })
    it('should add a food on /foods POST', function(done) {
     request(app)
    .post('/foods')
    .send({'name': 'Apple', 'calories': 94})
    .end((err, res) => {
      expect(res.body).to.be.an('object')
      done();
    });
});
  }) // end describe('/api/foods')
}) // end describe('Foods routes')
