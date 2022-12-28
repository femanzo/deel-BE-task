const request = require('supertest')
const assert = require('assert')

const app = require('../app')

describe('Jobs Controller', () => {
  it('should only return active unpaid jobs for the user', async () => {
    await request(app)
      .get('/jobs/unpaid')
      .set('profile_id', 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        res.body.forEach((job) => {
          assert(job.status == 'active')
          assert(job.paid == false)
        })
      })
  })

  it('can only pay if user balance >= the amount to pay', async () => {
    throw new Error('Not implemented')
  })

  it(`should move the amount paid from the client's balance to the contractor balance`, async () => {
    throw new Error('Not implemented')
  })

  it('should update the job status to paid', async () => {
    throw new Error('Not implemented')
  })
})
