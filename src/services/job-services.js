const { Op } = require('sequelize')

const { sequelize } = require('../models')
const { safeAdd, safeSubtract, assertRecordFound } = require('../utils')

const { Profile, Job, Contract } = sequelize.models

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
        where: { ClientId: clientId },
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
 * Return the total amount of jobs to pay for a user
 * @param {number} clientId
 * @param {transaction} seequelize transaction
 * @returns {number}
 */
const getTotalOfJobsToPay = async (clientId, transaction = null) => {
  if (!clientId) {
    throw new Error('clientId required')
  }

  const [{ total }] = await Contract.findAll({
    where: { clientId },
    include: [
      {
        model: Job.scope('unpaid'),
        attributes: [],
      },
    ],
    raw: true,
    attributes: [[sequelize.fn('sum', sequelize.col('price')), 'total']],
    transaction,
  })

  return total
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
  getTotalOfJobsToPay,
}
