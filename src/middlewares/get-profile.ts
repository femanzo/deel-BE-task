import type { Request, Response, NextFunction } from 'express'

import { dbServices } from '../services'
import { ApiError } from '../utils'

const { getProfileById } = dbServices

/*
 * Check for valid profile_id in header
 * Add a profile to the request object if it exists
 * Here we could validate a JWT token on a real world scenario
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  const { profile_id } = req.headers
  if (!profile_id) {
    const missingProfileIdError = new ApiError('Missing profile_id header', 401)
    return next(missingProfileIdError)
  }

  try {
    const profile = await getProfileById(Number(profile_id))
    if (!profile) {
      const profileNotFoundError = new ApiError(
        `Profile with id ${profile_id} could not be found`,
        401
      )
      return next(profileNotFoundError)
    }

    /**
     * Now the user is authenticated,
     * we add the profile to the req object
     * so we can use it later
     */
    req.profile = profile

    return next()
  } catch (err) {
    return next(err)
  }
}
