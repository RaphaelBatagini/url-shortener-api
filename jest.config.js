module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  setupFiles: ['<rootDir>/tests/config/setup-tests.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/database/migrations/*.ts', '!src/infra/index.ts'],
  coverageProvider: 'babel',
  coverageDirectory: 'coverage',
  restoreMocks: true,
};
