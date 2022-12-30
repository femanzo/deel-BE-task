const request = require('supertest')

const app = require('../../app')

describe('Balances Routes', () => {
  describe('POST /balances/deposit/:userId', () => {
    it('should return 200 if deposit is lower than or equal 25% his total of jobs to pay', async () => {
      await request(app)
        .post('/balances/deposit/2')
        .send({
          amount: 100,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('profile.balance', 231.11)
        })
    })

    it('should return 200 if deposit is lower than or equal 25% his total of jobs to pay', async () => {
      await request(app)
        .post('/balances/deposit/2')
        .send({
          amount: 100,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('profile.balance', 331.11)
        })
    })

    it('should return an error if deposit is higher than 25% his total of jobs to pay', async () => {
      await request(app)
        .post('/balances/deposit/2')
        .send({
          amount: 1000,
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty('message', 'You cannot deposit more than $271.39')
        })
    })
  })
})
