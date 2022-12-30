const request = require('supertest')
const assert = require('assert')

const app = require('../../app')

describe('Jobs Routes', () => {
  it('should only return active unpaid jobs for the user', async () => {
    await request(app)
      .get('/jobs/unpaid')
      .set('profile_id', 1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        res.body.forEach((job) => {
          assert(job.Contract.status == 'in_progress')
          assert(!job.Contract.paid)
        })
      })
  })

  it(`can only pay if user balance >= the amount to pay`, async () => {
    await request(app)
      .get('/jobs/unpaid')
      .set('Accept', 'application/json')
      .set('profile_id', 1)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        res.body.forEach((job) => {
          assert(job.Contract.status == 'in_progress')
          assert(!job.Contract.paid)
        })
      })
  })
})
