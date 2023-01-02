import { Decimal } from 'decimal.js'

/**
 * Adds two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a + b
 */
export const safeAdd = (a: number, b: number) => {
  return new Decimal(a).add(b).toNumber()
}

/**
 * Subtracts two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a - b
 */
export const safeSubtract = (a: number, b: number) => {
  return new Decimal(a).sub(b).toNumber()
}

/**
 * Multiplies two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a * b
 */
export const safeMultiply = (a: number, b: number) => {
  return new Decimal(a).mul(b).toNumber()
}

/**
 * Round the number to the specified number of decimal places
 * @param {number} amount
 * @param {number} decimals
 * @returns {number} 2.12345 => 2.12
 */
export const safeToFixed = (amount: number, decimals: number) => {
  return new Decimal(amount).toDecimalPlaces(decimals).toNumber()
}
