const request = require('supertest')
const assert = require('assert')

const app = require('../app')

describe('Admin Controller', () => {
  describe('GET /admin/best-profession?start=<date>&end=<date>', () => {
    it('should only consider the time ranged specified in the params', async () => {
      throw new Error('Not implemented')
    })

    it('should return error if no jobs were paid in the specified time range', async () => {
      throw new Error('Not implemented')
    })
  })

  describe('GET /admin/best-clients?start=<date>&end=<date>&limit=<integer>', () => {
    it('should have the default limit = 2 if not specified in the params', async () => {
      throw new Error('Not implemented')
    })

    it('should only consider the time ranged specified in the params', async () => {
      throw new Error('Not implemented')
    })

    it('should return error if no jobs were paid in the specified time range', async () => {
      throw new Error('Not implemented')
    })
  })
})
