const { Op } = require('sequelize')

const { Contract } = require('../models')
const { CONTRACT_STATUS } = require('../constants')

/***********************
 * API exposed functions
 ***********************/
const getUserContractByIdRequest = async (req, res, next) => {
  const { id: contractId } = req.params
  const { id: profileId } = req.profile

  try {
    const contracts = await getUserContractById(profileId, contractId)
    return res.json(contracts)
  } catch (err) {
    return next(err)
  }
}

const getUserNonTerminantedContractsRequest = async (req, res, next) => {
  const { id: profileId } = req.profile

  try {
    const contracts = await getUserNonTerminantedContracts(profileId)
    return res.json(contracts)
  } catch (err) {
    return next(err)
  }
}

/***********************
 * Internal functions
 ***********************/

/**
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
    include: ['client', 'contractor'],
  })

  if (!contract) {
    const contractNotFoundErr = new Error(`No Contracts with ID ${contractId} could not be found`)
    contractNotFoundErr.statusCode = 404
    throw contractNotFoundErr
  }

  return contract
}

/**
 * @param {number} profileId - The id from ether the client or the contractor profile
 * @returns {Promise<Contract[]>} - The contracts that belong to the profile
 */
const getUserNonTerminantedContracts = async (profileId) => {
  const contracts = await Contract.findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      status: { [Op.not]: CONTRACT_STATUS.TERMINATED },
    },
    include: ['client', 'contractor'],
  })

  return contracts
}

module.exports = {
  getUserContractById,
  getUserContractByIdRequest,
  getUserNonTerminantedContracts,
  getUserNonTerminantedContractsRequest,
}
