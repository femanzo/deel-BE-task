/**
 * Middleware to validate request query
 * @param {function(string[])} fields - The fields to validate
 * ex: validateQuery(['start', 'end'])
 */
const validateQuery = (fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      if (!req.query[field]) {
        const queryValidationError = new Error(`Param '${field}' is required`)
        queryValidationError.statusCode = 400
        return next(queryValidationError)
      }
    }

    return next()
  }
}

module.exports = {
  validateQuery,
}
