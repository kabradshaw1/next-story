// tests/characters.spec.ts
import { test, expect, type Page, type Route } from '@playwright/test';

test.describe('Characters Page', () => {
  test('should display a list of characters', async ({
    page,
  }: {
    page: Page;
  }) => {
    // Mock the API call
    await page.route('**/graphql', async (route: Route) => {
      const mockedResponse = {
        data: {
          characters: [
            {
              title: 'Character 1',
              downloadURLs: [
                'http://example.com/image1.jpg',
                'http://example.com/image2.jpg',
              ],
            },
            {
              title: 'Character 2',
              downloadURLs: ['http://example.com/image3.jpg'],
            },
          ],
        },
      };

      console.log('Mocked response:', mockedResponse);
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(mockedResponse),
      });
    });

    await page.goto('/characters');
    console.log('Navigated to /characters');

    // Wait for the 'Characters' heading to be visible
    await expect(
      page.getByRole('heading', { name: 'Characters' })
    ).toBeVisible();
    console.log('Characters heading is visible');

    // Log page content for debugging
    const pageContent = await page.content();
    console.log('Page content:', pageContent);

    // Wait for a specific time to ensure characters are loaded
    await page.waitForTimeout(2000);

    // Check if characters are displayed
    const character1 = page.getByText('Character 1');
    const character2 = page.getByText('Character 2');
    console.log('Character 1 element:', character1);
    console.log('Character 2 element:', character2);

    await expect(character1).toBeVisible();
    await expect(character2).toBeVisible();
  });
});
