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
 *
 * @param {number} profileId - The id from ether the client or the contractor
 * @returns
 */
const getUserUnpaidJobs = async (profileId) => {
  const jobs = await Job.findAll({
    include: {
      model: Contract,
      as: 'contract',
      where: {
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        status: CONTRACT_STATUS.IN_PROGRESS,
      },
    },
  })

  return jobs
}

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
