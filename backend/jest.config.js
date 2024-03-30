process.env.DYNAMODB_TABLE_NAME = 'test-table';

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'html'],
    coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    }
};
