import type { Request, Response, NextFunction } from 'express'

import { ApiError } from '../utils'
import { profileServices } from '../services'

const { depositFunds } = profileServices

export const depositFundsRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params
  const { amount } = req.body

  if (!userId || !amount) throw new ApiError('Invalid parameters', 400)

  try {
    const result = await depositFunds(Number(userId), Number(amount))
    return res.json(result)
  } catch (err) {
    return next(err)
  }
}

export const getMyProfile = async (req: Request, res: Response) => {
  res.json(req.profile)
}
