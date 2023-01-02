import type { Request, Response, NextFunction } from 'express'

import { dbServices } from '../services'

const { getProfileContractById, getUserNonTerminantedContracts } = dbServices

export const getProfileContractByIdRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: contractId } = req.params
  const { id: profileId } = req.profile

  try {
    const contracts = await getProfileContractById(Number(profileId), Number(contractId))
    return res.json(contracts)
  } catch (err) {
    return next(err)
  }
}

export const getUserNonTerminantedContractsRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: profileId } = req.profile

  try {
    const contracts = await getUserNonTerminantedContracts(Number(profileId))
    return res.json(contracts)
  } catch (err) {
    return next(err)
  }
}
