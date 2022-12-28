const request = require('supertest')
const assert = require('assert')

const app = require('../app')

describe('Balances Controller', () => {
  describe('POST /balances/deposit/:userId', () => {
    it('should return an error if deposit is higher than 25% his total of jobs to pay', async () => {
      throw new Error('Not implemented')
    })
  })
})
