/**
 * Check if date is valid js Date object
 * @param {Date} date
 * @returns {boolean}
 */
const isValidDate = (date) => {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (!isNaN(date.getTime())) {
      return true
    }
  }
  return false
}

/**
 * Check if start date is before end date
 * @param {Date} start
 * @param {Date} end
 * @returns {boolean}
 */
const isValidTimeRange = (start, end) => {
  if (!isValidDate(start) || !isValidDate(end)) {
    return false
  }
  return start.getTime() <= end.getTime()
}

module.exports = {
  isValidDate,
  isValidTimeRange,
}
