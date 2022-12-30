const {
  jobServices: { payJob },
} = require('../')

describe('payJob', () => {
  it('should throw an error if the job is already paid', async () => {
    // skip first payment handling
    try {
      await payJob(1, 1)
    } catch (err) {}

    await payJob(1, 1).catch((err) => {
      expect(err).toHaveProperty('statusCode', 409)
      expect(err).toHaveProperty('message', 'Job #1 was already paid')
    })
  })
})
