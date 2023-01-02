import type { Transaction } from 'sequelize'
import { Op } from 'sequelize'

import { sequelize } from '../db'
import { ApiError } from '../utils'
import { getJobById, getProfileContractById } from './db-services'
import { transferFunds } from './profile-services'

import { Job, Contract } from '../models'

/**
 * Pay for a job, a client can only pay if his balance >= the amount to pay.
 * The amount should be moved from the client's balance to the contractor balance.
 * @param {number} clientId - The id of the client
 * @param {number} jobId - The id of the job
 * @returns {Promise<{job: Job, client: Profile, contractor: Profile}>}
 */
export const payJob = async (clientId: number, jobId: number) => {
  try {
    const result = await sequelize.transaction(async (t: Transaction) => {
      const job = await getJobById(jobId, t)

      if (!job) throw new ApiError(`Job ${jobId} not found`, 404)

      const { contract } = job

      if (!contract) throw new ApiError(`Contract not found`, 404)

      // only the job's client can pay for the job
      // return 404 default message to avoid leaking information about existing contracts
      if (contract.ClientId !== clientId) throw new ApiError('Contract not found', 404)

      // paid is not null, false, 0 or undefined
      if (job.paid) throw new ApiError(`Job #${jobId} was already paid`, 409)

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
export const getUserUnpaidJobs = async (profileId: number) => {
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
