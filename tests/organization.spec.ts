import { test, expect, type Page } from '@playwright/test';

test.describe('Organization Page', () => {
  test('should display a list of organizations', async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.goto('/organizations');

    // Wait for the 'Organizations' heading to be visible
    await expect(
      page.getByRole('heading', { name: 'Organizations' })
    ).toBeVisible();

    // Wait for a specific time to ensure organizations are loaded
    await page.waitForTimeout(2000);

    // Check if organizations are displayed using locator
    const organization1 = page.locator('text=Organization 2');

    await expect(organization1).toBeVisible();
  });
  test('should navigate to create organization form and create a new organization', async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.goto('/organizations');

    // Click the 'Create Organization' button
    await page.click('text=Create Organization');

    // Fill out the form
    await page.fill('#title', 'New Organization');
    await page.fill('#text', 'Description of the new organization');

    // Assuming you have a file input for uploading files
    // await page.setInputFiles('input[type="file"]', 'path/to/your/file.png');

    // Select values for other fields if necessary
    // Example: await page.selectOption('#headquarters', '1');

    // Submit the form
    await page.click('button[type="submit"]');

    // Check for successful creation message or redirection to the organizations list
    // Example: Check for the presence of the new organization in the list
    await page.waitForNavigation();
    await expect(page).toHaveURL('/organizations');
    await expect(page.locator('text=New Organization')).toBeVisible();
  });
});
