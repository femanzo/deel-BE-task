const { Op } = require('sequelize')

const { sequelize } = require('../db')
const { assertRecordFound } = require('../utils')

const {
  models: { Profile, Contract, Job },
} = sequelize

/**
 * Get a profile by id
 * @param {number} profileId
 * @param {Sequelize.Transaction} transaction - The transaction to use
 * @returns {Promise<Profile>}
 * @throws {Error} - If profile is not found
 */
const getProfileById = async (profileId, transaction = null) => {
  if (!profileId) {
    const profileIdMissingError = new Error('profileId is required')
    profileIdMissingError.statusCode = 400
    throw profileIdMissingError
  }

  const profile = await Profile.findByPk(profileId, { transaction })

  assertRecordFound(profile, 'Profile', profileId)
  return profile
}

/**
 * Get a job by id
 * @param {number} jobId
 * @param {number} clientId
 * @param {Sequelize.Transaction} transaction - The transaction to use
 * @returns {Promise<Job>}
 * @throws {Error} - If job is not found
 */
const getJobById = async (jobId, clientId, transaction = null) => {
  if (!jobId) throw new Error('jobId is required')

  const job = await Job.findByPk(jobId, {
    where: { ClientId: clientId },
    transaction,
  })

  assertRecordFound(job, 'Job', jobId)
  return job
}

/**
 * Get a contract by id that belongs to the client
 * @param {number} profileId - The id from ether the client or the contractor profile
 * @param {number} contractId - The contract Id
 * @param {Sequelize.Transaction} transaction - The transaction to use
 * @returns {Promise<Contract>} - The contract
 * @throws {Error} - If contract is not found
 */
const getProfileContractById = async (profileId, contractId, transaction = null) => {
  if (!profileId) throw new Error('profileId is required')
  if (!contractId) throw new Error('contractId is required')

  const contract = await Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
    include: ['Client', 'Contractor'],
    transaction,
  })

  assertRecordFound(contract, 'Contract', contractId)

  return contract
}

/**
 * Get all the non-terminated contracts that belong to the profile
 * @param {number} profileId - The id from ether the client or the contractor profile
 * @returns {Promise<Contract[]>} - The contracts that belong to the profile
 */
const getUserNonTerminantedContracts = async (profileId) => {
  const contracts = await Contract.scope('pending').findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
    attributes: {
      exclude: ['ClientId', 'ContractorId'],
    },
    include: ['Client', 'Contractor'],
  })

  return contracts
}

module.exports = {
  getProfileById,
  getProfileContractById,
  getJobById,
  getUserNonTerminantedContracts,
}
