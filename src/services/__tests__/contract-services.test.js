const { sequelize } = require('../../models')
const {
  contractServices: { getUserContractById, getUserNonTerminantedContracts },
} = require('../')

describe('getUserContractById', () => {
  it('should return the contract if it belongs to the user', async () => {
    const expectedJson = {
      id: 1,
      status: 'terminated',
      terms: 'bla bla bla',
    }

    expect(getUserContractById(1, 1)).then((contract) => {
      expect(contract.toJSON()).toMatchObject(expectedJson)
    })
  })

  it('should throw an error if the contract does not belong to the user', async () => {
    expect(getUserContractById(1, 3)).rejects.toThrow(Error)
  })
})

describe('getUserNonTerminantedContracts', () => {
  it('should return the contracts that belong to the user', async () => {
    const contracts = await getUserNonTerminantedContracts(1)
    expect(contracts.length).toBe(2)
  })
})
