import { Op, Transaction } from 'sequelize'

import { Job, Profile, Contract } from '../models'
import { assertRecordFound } from '../utils'

/**
 * Get a profile by id
 * @param {number} profileId
 * @param {Sequelize.Transaction?} transaction - The transaction to use
 * @returns {Promise<Profile>}
 * @throws {Error} - If profile is not found
 */
export const getProfileById = async (profileId: number, transaction: Transaction | null = null) => {
  if (!profileId) throw new Error('profileId is required')

  const profile = await Profile.findByPk(profileId, { transaction })

  assertRecordFound(profile, 'Profile', profileId)

  return profile
}

/**
 * Get a job by id
 * @param {number} jobId
 * @param {Sequelize.Transaction} transaction - The transaction to use
 * @returns {Promise<Job>}
 * @throws {Error} - If job is not found
 */
export const getJobById = async (jobId: number, transaction: Transaction | null = null) => {
  if (!jobId) throw new Error('jobId is required')

  const job = await Job.findByPk(jobId, { transaction, include: ['contract'] })

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
export const getProfileContractById = async (
  profileId: number,
  contractId: number,
  transaction: Transaction | null = null
) => {
  if (!profileId) throw new Error('profileId is required')
  if (!contractId) throw new Error('contractId is required')

  const contract = await Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
    include: ['client', 'contractor', 'jobs'],
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
export const getUserNonTerminantedContracts = async (profileId: number) => {
  const contracts = await Contract.scope('pending').findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
    include: ['client', 'contractor', 'jobs'],
  })

  return contracts
}
