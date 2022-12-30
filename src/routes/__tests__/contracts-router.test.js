const request = require('supertest')
const assert = require('assert')

const app = require('../../app')

describe('Contracts Routes', () => {
  /* TODO: This test should be moved to a separate file */
  it('should return 401 if missing profile_id header', async () => {
    await request(app).get('/contracts/1').expect(401)
  })

  it("should return NotFound 404 error if contract's ID does not belong to user", async () => {
    await request(app)
      .get('/contracts/1')
      .set('profile_id', 2)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
  })

  it('should return the contract only if it belongs to the profile calling', async () => {
    await request(app)
      .get('/contracts/1')
      .set('profile_id', 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  it('should return only contracts belonging to the logged user', async () => {
    await request(app)
      .get('/contracts')
      .set('profile_id', 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  it('should only contain non terminated contracts', async () => {
    await request(app)
      .get('/contracts')
      .set('profile_id', 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert(Array.isArray(res.body))
        res.body.forEach((contract) => {
          assert(contract.status != 'terminated')
        })
      })
  })

  it('should return plain text error if Accept specified', async () => {
    await request(app).get('/contracts').set('Accept', 'text/plain').expect('Content-Type', /plain/)
  })
})
