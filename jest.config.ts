import { Config } from '@jest/types';
const config: Config.InitialOptions = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node', // Use 'jsdom' for browser-like environments
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Jest setup file
  moduleNameMapper: {
    // Handle module aliases (if you're using them in your project)
    '^@components/(.*)$': '<rootDir>/components/$1',
  },
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};
export default config;