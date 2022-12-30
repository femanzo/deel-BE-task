const { Op } = require('sequelize')

const { sequelize } = require('../db')

const { getJobById, getProfileContractById } = require('./db-services')
const { transferFunds } = require('./profile-services')

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

      const contract = await getProfileContractById(clientId, job.ContractId, t).catch((err) => {
        /*
         fix for possible security issue,
         this would leak the existence of a contract and its id
         */
        const contractNotFoundError = new Error('Contract not found')
        contractNotFoundError.statusCode = 404
        throw contractNotFoundError
      })

      // paid is not null, false, 0 or undefined
      if (job.paid) {
        const jobPaidError = new Error(`Job #${jobId} was already paid`)
        jobPaidError.statusCode = 409
        throw jobPaidError
      }

      await transferFunds(contract.ClientId, contract.ContractorId, job.price, t)

      job.paid = true
      job.paymentDate = new Date()

      await job.save({ transaction: t })

      return job
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
