export default {
  env: {
    node: true,
    es2022: true,
    commonjs: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['@typescript-eslint/recommended', 'jest'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
}
