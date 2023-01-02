import type { Request, Response, NextFunction } from 'express'

import { adminServices } from '../services'
import { ApiError } from '../utils'

const { getBestClients, getBestProfession } = adminServices

export const getBestClientsRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { start, end } = req.query

  if (!start) return next(new ApiError(`Param 'start' is required`, 400))
  if (!end) return next(new ApiError(`Param 'end' is required`, 400))

  let limit = 2
  if (req.query.limit) {
    limit = Number(req.query.limit)
    if (limit === 0) limit = 2
  }

  const startDate = new Date(start as string)
  const endDate = new Date(end as string)

  try {
    const result = await getBestClients(startDate, endDate, limit)
    return res.json(result)
  } catch (err) {
    return next(err)
  }
}

export const getBestProfessionRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { start, end } = req.query

  if (!start) return next(new ApiError(`Param 'start' is required`, 400))
  if (!end) return next(new ApiError(`Param 'end' is required`, 400))

  const startDate = new Date(start as string)
  const endDate = new Date(end as string)

  try {
    const result = await getBestProfession(startDate, endDate)
    return res.json(result)
  } catch (err) {
    return next(err)
  }
}
