import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Changed to 'jsdom' for frontend tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Jest setup file
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};

export default config;
