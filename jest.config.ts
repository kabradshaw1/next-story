// jest.config.ts
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // setupFiles: ['<rootDir>/jest.polyfills.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/cypress/'],
  // transform: {
  //   '^.+\\.tsx?$': '@swc/jest',
  // },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json'
    }
  },
  // testEnvironmentOptions: {
  //   /**
  //    * @note Opt-out from JSDOM using browser-style resolution
  //    * for dependencies. This is simply incorrect, as JSDOM is
  //    * not a browser, and loading browser-oriented bundles in
  //    * Node.js will break things.
  //    *
  //    * Consider migrating to a more modern test runner if you
  //    * don't want to deal with this.
  //    */
  //   customExportConditions: [''],
  // },
};

export default createJestConfig(customJestConfig);
