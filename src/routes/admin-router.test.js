const request = require('supertest')
const assert = require('assert')

const app = require('../app')

describe('Admin Router', () => {
  describe('GET /admin/best-profession?start=<date>&end=<date>', () => {
    it('should return the best profession in the specified time range', async () => {
      await request(app)
        .get('/admin/best-profession?start=2020-01-01&end=2020-12-31')
        .expect(200)
        .then((res) => {
          assert.deepStrictEqual(res.body, {
            profession: 'Programmer',
            totalEarnings: 2683,
          })
        })
    })

    it('should return error if no jobs were paid in the specified time range', async () => {
      await request(app).get('/admin/best-profession?start=2050-01-01&end=2060-12-31').expect(404)
    })

    it('should return error if start date is invalid', async () => {
      await request(app).get('/admin/best-profession?start=invalid&end=2060-12-31').expect(400)
    })

    it('should return error if end date is invalid', async () => {
      await request(app).get('/admin/best-profession?start=2060-10-10&end=joelma').expect(400)
    })
  })

  describe('GET /admin/best-clients?start=<date>&end=<date>&limit=<integer>', () => {
    it('should have the default limit = 2 if not specified in the params', async () => {
      await request(app)
        .get('/admin/best-clients?start=2010&end=2030')
        .expect(200)
        .then((res) => {
          res.toHaveLength(2)
        })
    })

    it('should return error if no jobs were paid in the specified time range', async () => {
      await request(app).get('/admin/best-clients?start=2010&end=2030').expect(404)
    })
  })
})
