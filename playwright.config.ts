import { defineConfig, devices } from '@playwright/test';

// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  reporter: 'html',

  use: {
    baseURL: 'http://127.0.0.1:3000',

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    // elsint disable-next-line @typescript-eslint/strict-boolean-expressions
    reuseExistingServer: !process.env.CI,
  },
});
