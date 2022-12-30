const {
  dbServices: { getProfileContractById, getUserNonTerminantedContracts },
} = require('../services')

const getProfileContractByIdRequest = async (req, res, next) => {
  const { id: contractId } = req.params
  const { id: profileId } = req.profile

  try {
    const contracts = await getProfileContractById(profileId, contractId)
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
  getProfileContractByIdRequest,
  getUserNonTerminantedContractsRequest,
}
