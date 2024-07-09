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
    await page.fill('#roleTitle', roleTitle);
    await page.fill('#text', 'Role Description');
    await page.click('text=Add Role');

    // Wait for the role to be added and displayed in the SVG
    const roleInSvg = page.locator(`text=${roleTitle}`);
    await expect(roleInSvg).toBeVisible();

    // Click the role in the SVG
    await roleInSvg.click();

    // Fill out the second role
    await page.fill('#roleTitle', role2Title);
    await page.click('text=Add Role');

    // Close the roles overlay
    await page.click('text=Done');

    // Submit the organization form
    await page.click('button[type="submit"]');

    // Check for successful creation message or redirection to the organizations list
    await expect(page).toHaveURL('/organizations');
    await expect(page.locator(`text=${organizationTitle}`)).toBeVisible();
  });
});
