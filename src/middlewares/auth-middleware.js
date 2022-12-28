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

  const { Profile } = req.app.get('models')

  try {
    const profile = await Profile.findByPk(profile_id)
    if (!profile) {
      const profileNotFoundError = new Error(
        `Profile with id ${profile_id} could not be found`
      )
      profileNotFoundError.statusCode = 401
      return next(profileNotFoundError)
    }

    req.profile = profile
    return next()
  } catch (err) {
    return next(err)
  }
}