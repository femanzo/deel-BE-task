const Decimal = require('decimal.js')

/**
 * This function adds two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function safeAdd(a, b) {
  return Number(new Decimal(a).add(b))
}

/**
 * This function subtracts two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function safeSubtract(a, b) {
  return Number(new Decimal(a).sub(b))
}

module.exports = {
  safeAdd,
  safeSubtract,
}
