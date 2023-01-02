import { expect, describe, it } from '@jest/globals'

import { dbServices } from '..'

const { getProfileContractById, getUserNonTerminantedContracts } = dbServices

describe('getProfileContractById', () => {
  it('should return the contract if it belongs to the user', async () => {
    await getProfileContractById(1, 1).then((contract) => {
      expect(contract).toHaveProperty('id', 1)
      expect(contract).toHaveProperty('Client')
      expect(contract).toHaveProperty('Contractor')
    })
  })

  it('should throw an error if the contract does not belong to the user', async () => {
    await getProfileContractById(1, 3).catch((err) => {
      expect(err).toHaveProperty('statusCode', 404)
      expect(err).toHaveProperty('message', 'Contract #3 not found')
    })
  })
})

describe('getUserNonTerminantedContracts', () => {
  it('should return the contracts that belong to the user', async () => {
    await getUserNonTerminantedContracts(1).then((contracts) => {
      contracts.forEach((contract) => {
        expect(contract).not.toHaveProperty('status', 'terminated')
      })
    })
  })
})
