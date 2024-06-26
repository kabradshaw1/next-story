import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend({
  model: async ({ page }, use) => {
    await page.route('https://backend.api', async (route) => {
      const json = {
        message: { msg: "It's a test message!" },
      };
      await route.fulfill({ json });
    });
  },
});
