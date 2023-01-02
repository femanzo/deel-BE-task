/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  globals: {
    '@swc/jest': {
      __DEV__: true,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  coverageProvider: 'v8',
  globalSetup: './scripts/jest-global-setup.ts',
  testPathIgnorePatterns: ['<rootDir>/dist/'],
}
