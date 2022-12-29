const Decimal = require('decimal.js')

/**
 * Adds two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a + b
 */
function safeAdd(a, b) {
  return Number(new Decimal(a).add(b))
}

/**
 * Subtracts two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a - b
 */
function safeSubtract(a, b) {
  return Number(new Decimal(a).sub(b))
}

/**
 * Multiplies two numbers avoiding floating point errors
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
