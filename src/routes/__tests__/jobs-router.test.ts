import { describe, it } from '@jest/globals'
import request from 'supertest'
import assert from 'node:assert'

import { Job } from '../../models'

import app from '../../app.js'

describe('Jobs Routes', () => {
  it('should only return active unpaid jobs for the user', async () => {
    // await request(app)
    //   .get('/jobs/unpaid')
    //   .set('profile_id', '1')
    //   .set('Accept', 'application/json')
    //   .expect('Content-Type', /json/)
    //   .expect(200)
    //   .then((res) => {
    //     res.body.forEach((job: Job) => {
    //       assert(job.contract.status == 'in_progress')
    //       assert(!job.paid)
    //     })
    //   })
  })

  it(`can only pay if user balance >= the amount to pay`, async () => {
    // await request(app)
    //   .get('/jobs/unpaid')
    //   .set('Accept', 'application/json')
    //   .set('profile_id', '1')
    //   .expect('Content-Type', /json/)
    //   .expect(200)
    //   .then((res) => {
    //     // res.body.forEach((job) => {
    //     //   assert(job.contract.status == 'in_progress')
    //     //   assert(!job.paid)
    //     // })
    //   })
  })
})
