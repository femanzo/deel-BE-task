const {
  dbServices: { getProfileById },
} = require('../services')

/*
 * Check for valid profile_id in header
 * Add a profile to the request object if it exists
 * Here we could validate a JWT token on a real world scenario
 */
module.exports = async (req, res, next) => {
  const { profile_id } = req.headers
  if (!profile_id) {
    const missingProfileIdError = new Error('Missing profile_id header')
    missingProfileIdError.statusCode = 401

    return next(missingProfileIdError)
  }

  try {
    const profile = await getProfileById(profile_id)
    if (!profile) {
      const profileNotFoundError = new Error(`Profile with id ${profile_id} could not be found`)
      profileNotFoundError.statusCode = 401
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
