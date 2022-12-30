const { Op } = require('sequelize')

const { sequelize } = require('../db')
const { safeAdd, safeSubtract } = require('../utils')

const { getJobById, getProfileById, getUserContractById } = require('./db-services')

const {
  models: { Job, Contract },
} = sequelize

/**
 * Pay for a job, a client can only pay if his balance >= the amount to pay.
 * The amount should be moved from the client's balance to the contractor balance.
 * @param {number} clientId - The id of the client
 * @param {number} jobId - The id of the job
 * @returns {Promise<{job: Job, client: Profile, contractor: Profile}>}
 */
const payJob = async (clientId, jobId) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const job = await getJobById(jobId, clientId, t)

      // paid is not null, false, 0 or undefined
      if (job.paid) {
        const jobPaidError = new Error(`Job #${jobId} was already paid`)
        jobPaidError.statusCode = 409
        throw jobPaidError
      }

      const contract = await getUserContractById(clientId, job.ContractId, t)
      const client = await getProfileById(contract.ClientId, t)
      const contractor = await getProfileById(contract.ContractorId, t)

      client.balance = safeSubtract(client.balance, job.price)

      if (client.balance < 0) {
        const unsuficientBalanceError = new Error(
          `Not enough balance to pay for this job, you need at least $${job.price} to pay for this job`
        )
        unsuficientBalanceError.statusCode = 400
        throw unsuficientBalanceError
      }

      contractor.balance = safeAdd(contractor.balance, job.price)
      job.paid = true
      job.paymentDate = new Date()

      await job.save({ transaction: t })
      await client.save({ transaction: t })
      await contractor.save({ transaction: t })

      return { job, client, contractor }
    })

    return result
  } catch (error) {
    throw error
  }
}

/**
 * Get all unpaid jobs for a user (either a client or contractor), for active contracts only.
 * @param {number} profileId - The id from either the client or the contractor profile
 * @returns {Promise<Job[]>} - The jobs
 */
const getUserUnpaidJobs = async (profileId) => {
  const jobs = await Job.scope('unpaid').findAll({
    include: {
      model: Contract.scope('active'),
      where: {
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    },
  })

  return jobs
}

module.exports = {
  payJob,
  getUserUnpaidJobs,
}
