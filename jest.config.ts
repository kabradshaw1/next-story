import { Config } from '@jest/types';
const config: Config.InitialOptions = {
  preset: 'ts-jest', // Use 'jsdom' for browser-like environments
  testEnvironment: 'ts-node', 
  
};
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Use 'jsdom' for browser-like environments
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Jest setup file
};