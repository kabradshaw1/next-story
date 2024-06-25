import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where your tests are located
  timeout: 60000, // Increased timeout for each test
  use: {
    baseURL: 'http://localhost:3000', // The base URL of your Next.js app
    headless: true, // Set to false if you want to see the browser action
    browserName: 'chromium',

    screenshot: 'only-on-failure', // Take screenshots only on test failure
    video: 'retain-on-failure', // Record videos only on test failure
  },
  webServer: {
    command: 'npm run dev', // Command to start your Next.js app
    port: 3000,
    timeout: 120 * 1000,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    reuseExistingServer: !process.env.CI, // Reuse server if not in CI environment
  },
  reporter: [['list'], ['json', { outputFile: 'test-results.json' }]], // Added JSON reporter for better debugging
});
