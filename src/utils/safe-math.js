const Decimal = require('decimal.js')

/**
 * This function adds two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a + b
 */
function safeAdd(a, b) {
  return Number(new Decimal(a).add(b))
}

/**
 * This function subtracts two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a - b
 */
function safeSubtract(a, b) {
  return Number(new Decimal(a).sub(b))
}

/**
 * This function multiplies two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a * b
 */
function safeMultiply(a, b) {
  return Number(new Decimal(a).mul(b))
}

module.exports = {
  safeAdd,
  safeSubtract,
  safeMultiply,
}
