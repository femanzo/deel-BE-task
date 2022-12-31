import type { Request, Response, NextFunction } from 'express'

import { ApiError } from '../utils'

/**
 * Middleware to validate request query
 * @param {function(string[])} fields - The fields to validate
 * ex: validateQuery(['start', 'end'])
 */
export const validateQuery = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      if (!req.query[field]) {
        return next(new ApiError(`Param '${field}' is required`, 400))
      }
    }

    return next()
  }
}
