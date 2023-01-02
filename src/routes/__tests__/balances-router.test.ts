import { expect, describe, it } from '@jest/globals'
import request from 'supertest'

import app from '../../app'

describe('Balances Routes', () => {
  describe('POST /balances/deposit/:userId', () => {
    it('should return 200 if deposit is lower than or equal 25% his total of jobs to pay', async () => {
      await request(app)
        .post('/balances/deposit/4')
        .send({
          amount: 100,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('message', '$100 deposited successfully')
        })
    })

    it('should return 200 if deposit is lower than or equal 25% his total of jobs to pay', async () => {
      await request(app)
        .post('/balances/deposit/4')
        .send({
          amount: 12.012,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('message', '$12.012 deposited successfully')
        })
    })

    it('should return an error if deposit is higher than 25% his total of jobs to pay', async () => {
      await request(app)
        .post('/balances/deposit/4')
        .send({
          amount: 1000,
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty(
            'message',
            'The deposit amount is greater than the max permitted amount'
          )
        })
    })
  })
})
