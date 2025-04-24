module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testMatch: ['**/test/**/*.spec.ts'], 
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/src/**/*.(t|j)s'], 
    coverageDirectory: './coverage',
  };
  