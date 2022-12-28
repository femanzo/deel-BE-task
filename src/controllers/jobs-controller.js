const { Job, Contract } = require('../models')
const { Op } = require('sequelize')
const { CONTRACT_STATUS } = require('../constants')

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

const payJobRequest = async (req, res) => {
  throw new Error('Not implemented')
}

/***********************
 * Internal functions
 ***********************/

/**
 * @param {number} profileId - The id from ether the client or the contractor profile
 * @returns {Promise<Job[]>} - The jobs
 */
const getUserUnpaidJobs = async (profileId) => {
  const jobs = await Job.scope('unpaid').findAll({
    include: {
      model: Contract.scope('active'),
      as: 'contract',
      where: {
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    },
  })

  return jobs
}

/**
 * @param {number} jobId
 * @returns
 */
const payJob = async (jobId) => {
  const jobs = await Job.findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      status: 'active',
      paid: false,
    },
  })

  return jobs
}

module.exports = {
  getUserUnpaidJobs,
  payJob,
  getUserUnpaidJobsRequest,
  payJobRequest,
}
