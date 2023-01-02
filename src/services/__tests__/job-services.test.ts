import { expect, describe, it } from '@jest/globals'

import { jobServices, profileServices } from '..'

const { payJob } = jobServices
const { depositFunds } = profileServices

describe('payJob', () => {
  it('should successfully pay for the job', async () => {
    await payJob(1, 1).catch((err) => {
      expect(err).toHaveProperty('statusCode', 200)
    })
  })

  it('should throw an error if the job is already paid', async () => {
    await payJob(1, 1).catch((err) => {
      expect(err).toHaveProperty('statusCode', 409)
      expect(err).toHaveProperty('message', 'Job #1 was already paid')
    })
  })

  it('should successfully pay after deposit', async () => {
    const clientId = 2
    const jobId = 4

    await depositFunds(clientId, 250)

    await payJob(clientId, jobId).then((job) => {
      expect(job).toHaveProperty('paid', true)
    })
  })
})
