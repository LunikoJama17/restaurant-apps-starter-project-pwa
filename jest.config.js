/**
 * @type {import('jest').Config}
 */
const config = {
  testMatch: [
    '**/tests/**/*.test.[jt]s?(x)',
  ],
  setupFiles: ['fake-indexeddb/auto'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
};

module.exports = config;