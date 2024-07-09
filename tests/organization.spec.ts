import { test, expect, type Page } from '@playwright/test';

import { generateRandomTitle } from './helper';

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

  test('organizations should have a create button that should navigate to the create organization form', async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.goto('/organizations');
    await page.click('text=Create Organization');
    await expect(page).toHaveURL('/organizations/add-organization');
  });

  test('should navigate to create organization form and create a new organization', async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.goto('/organizations/add-organization');

    const organizationTitle = `Org ${generateRandomTitle(10)}`;
    const roleTitle = `Role ${generateRandomTitle(10)}`;
    const role2Title = `Role ${generateRandomTitle(10)}`;
    // Fill out the organization form
    await page.fill('#title', organizationTitle);
    await page.fill('#text', 'Description of the new organization');

    // Open the roles overlay
    await page.click('text=Roles');

    // Fill out the roles form
    await page.fill('#title', roleTitle);
    await page.fill('#text', 'Role Description');

    // Ensure the "Add Role" button is enabled before clicking it
    const addRoleButton = page.locator('text=Add Role');
    await expect(addRoleButton).toBeEnabled();

    // Click the "Add Role" button
    await addRoleButton.click();

    await page.fill('#title', role2Title);
    await expect(addRoleButton).toBeEnabled();
    await addRoleButton.click();

    // Close the roles overlay
    await page.click('text=Done');

    // Submit the organization form
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Check for successful creation message or redirection to the organizations list
    await page.waitForURL('/organizations');
    await expect(page).toHaveURL('/organizations');
    await expect(page.locator(`text=${organizationTitle}`)).toBeVisible();
  });
});
