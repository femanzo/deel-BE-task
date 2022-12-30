const request = require('supertest')

const app = require('../../app')

describe('Balances Routes', () => {
  describe('POST /balances/deposit/:userId', () => {
    it('should return an error if deposit is higher than 25% his total of jobs to pay', async () => {
      await request(app).post('/balances/deposit/1').send({ amount: 10000 }).expect(400)
    })

    it('should return 200 if deposit is lower than or equal 25% his total of jobs to pay', async () => {
      await request(app)
        .post('/balances/deposit/1')
        .set('profile_id', 1)
        .send({ amount: 10 })
        .expect(200)
    })
  })
})
