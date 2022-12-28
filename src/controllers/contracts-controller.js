const { Op } = require('sequelize')

const getUserContractById = async (req, res, next) => {
  const { Contract } = req.app.get('models')
  const { id } = req.params

  const contract = await Contract.findOne({
    where: {
      id,
      [Op.or]: [{ ClientId: req.profile.id }, { ContractorId: req.profile.id }],
    },
    include: ['client', 'contractor'],
  })

  if (!contract) {
    const contractNotFoundErr = new Error(`Contract with id ${id} could not be found`)
    contractNotFoundErr.statusCode = 404
    return next(contractNotFoundErr)
  }

  return res.json(contract)
}

const getUserNonTerminantedContracts = async (req, res) => {
  const { Contract } = req.app.get('models')
  const contracts = await Contract.findAll({
    where: {
      [Op.or]: [{ ClientId: req.profile.id }, { ContractorId: req.profile.id }],
      status: { [Op.not]: 'terminated' },
    },
    include: ['client', 'contractor'],
  })

  return res.json(contracts)
}

module.exports = {
  getUserContractById,
  getUserNonTerminantedContracts,
}
