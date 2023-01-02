import { expect, describe, it } from '@jest/globals'

import { safeAdd, safeSubtract, safeToFixed } from '../safe-math'

describe('Safe Math', () => {
  it('should add two numbers', () => {
    const result = safeAdd(1, 2)
    expect(result).toBe(3)
  })

  it('should add two decimal numbers without floating point errors', () => {
    const result = safeAdd(1.02, 1.002)
    expect(result).toBe(2.022)
  })

  it('should subtract two numbers', () => {
    const result = safeSubtract(3, 1)
    expect(result).toBe(2)
  })

  it('should subtract two decimal numbers without floating point errors', () => {
    const result = safeSubtract(1.02, 1.002)
    expect(result).toBe(0.018)
  })

  it('should subtract two decimal numbers without floating point errors', () => {
    const result = safeSubtract(1.02, 1)
    expect(result).toBe(0.02)
  })

  //  describe('safeToFixed', () => {
  it('should return a number with the precision defined', () => {
    expect(safeToFixed(1.12345, 0)).toBe(1)
    expect(safeToFixed(1.12345, 1)).toBe(1.1)
    expect(safeToFixed(1.12345, 2)).toBe(1.12)
    expect(safeToFixed(1.12345, 3)).toBe(1.123)
  })

  //})
})
