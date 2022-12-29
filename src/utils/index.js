const { assertRecordFound } = require('./errors')
const { isValidDate, isValidTimeRange } = require('./date')
const { safeAdd, safeSubtract, safeMultiply } = require('./safe-math')
const { validateQuery } = require('../middlewares/query-validator')

module.exports = {
  safeAdd,
  safeMultiply,
  safeSubtract,
  assertRecordFound,
  isValidDate,
  isValidTimeRange,
  validateQuery,
}
