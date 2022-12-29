const { Op } = require('sequelize')

const { sequelize } = require('../models')
const { assertRecordFound } = require('../utils')

const { Contract } = sequelize.models

/**
 * Get a contract by id that belongs to the profile
 * @param {number} profileId - The id from ether the client or the contractor profile
 * @param {number} contractId - The contract Id
 * @returns {Promise<Contract>} - The contract
 */
const getUserContractById = async (profileId, contractId) => {
  const contract = await Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
    include: ['Client', 'Contractor'],
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
    include: ['Client', 'Contractor'],
  })

  return contracts
}

module.exports = {
  getUserContractById,
  getUserNonTerminantedContracts,
}
