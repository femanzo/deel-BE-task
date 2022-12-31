const { safeAdd, safeSubtract } = require('./safe-math')

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
})
