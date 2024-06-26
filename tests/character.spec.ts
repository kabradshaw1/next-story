import { test, expect, type Page } from '@playwright/test';

test.describe('Characters Page', () => {
  test('should display a list of characters', async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.goto('/characters');

    // Wait for the 'Characters' heading to be visible
    await expect(
      page.getByRole('heading', { name: 'Characters' })
    ).toBeVisible();

    // Wait for a specific time to ensure characters are loaded
    await page.waitForTimeout(2000);

    // Check if characters are displayed using locator
    const character1 = page.locator('text=Character 1');

    await expect(character1).toBeVisible();
  });
});
