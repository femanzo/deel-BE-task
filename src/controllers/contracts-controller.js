const {
  dbServices: { getUserContractById, getUserNonTerminantedContracts },
} = require('../services')

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

module.exports = {
  getUserContractByIdRequest,
  getUserNonTerminantedContractsRequest,
}
