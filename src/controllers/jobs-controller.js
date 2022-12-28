const { Job, Contract, Profile } = require('../models')
const { Op } = require('sequelize')
const { sequelize } = require('../models')
const { safeAdd, safeSubtract } = require('../utils')

/***********************
 * API exposed functions
 ***********************/
const getUserUnpaidJobsRequest = async (req, res, next) => {
  const profileId = req.profile.id

  try {
    const jobs = await getUserUnpaidJobs(profileId)
    return res.json(jobs)
  } catch (err) {
    return next(err)
  }
}

const payJobRequest = async (req, res, next) => {
  const profileId = req.profile.id
  const { job_id: jobId } = req.params

  try {
    const paidJob = await payJob(profileId, jobId)
    return res.json(paidJob)
  } catch (err) {
    return next(err)
  }
}

/***********************
 * Internal functions
 ***********************/

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

/**
 * Pay for a job, a client can only pay if his balance >= the amount to pay.
 * The amount should be moved from the client's balance to the contractor balance.
 * @param {number} clientId - The id from the client
 * @param {number} jobId - The id from the job
 * @returns {Promise<Job>} - The updated paid job
 */
const payJob = async (clientId, jobId) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const job = await Job.findByPk(jobId, {
        where: {
          ClientId: clientId,
        },

        transaction: t,
      })

      assertRecordFound(job, 'Job', jobId)

      // paid is not null, false, 0 or undefined
      if (job.paid) {
        const jobPaidError = new Error(`Job #${jobId} was already paid`)
        jobPaidError.statusCode = 409
        throw jobPaidError
      }

      const contract = await Contract.findByPk(job.ContractId, {
        transaction: t,
      })

      assertRecordFound(contract, 'Contract', job.ContractId)

      const client = await Profile.findByPk(contract.ClientId, {
        transaction: t,
      })

      assertRecordFound(client, 'Client', contract.ClientId)

      const contractor = await Profile.findByPk(contract.ContractorId, {
        transaction: t,
      })

      assertRecordFound(contractor, 'Contractor', contract.ContractorId)

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

      await job.save({
        transaction: t,
      })

      await client.save({
        transaction: t,
      })

      await contractor.save({
        transaction: t,
      })

      return { job, client, contractor }
    })

    return result
    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is the updated job job
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    throw error
  }
}

const assertRecordFound = (model, modelName, id) => {
  if (!model) {
    const modelNotFoundError = new Error(`${modelName} #${id} not found, please contact support`)
    modelNotFoundError.statusCode = 404
    throw modelNotFoundError
  }
}

module.exports = {
  getUserUnpaidJobs,
  payJob,
  getUserUnpaidJobsRequest,
  payJobRequest,
}
