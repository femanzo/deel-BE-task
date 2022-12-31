import { Decimal } from 'decimal.js'

/**
 * Adds two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a + b
 */
export const safeAdd = (a: number, b: number) => {
  return Number(new Decimal(a).add(b))
}

/**
 * Subtracts two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a - b
 */
export const safeSubtract = (a: number, b: number) => {
  return Number(new Decimal(a).sub(b))
}

/**
 * Multiplies two numbers avoiding floating point errors
 * @param {number} a
 * @param {number} b
 * @returns {number} a * b
 */
export const safeMultiply = (a: number, b: number) => {
  return Number(new Decimal(a).mul(b))
}
