import { test, expect, type Page, type Route } from '@playwright/test';

test.describe('Characters Page', () => {
  test('should display a list of characters', async ({
    page,
  }: {
    page: Page;
  }) => {
    // Mock the API call
    await page.route(
      'http://host.docker.internal:4000/graphql',
      async (route: Route) => {
        const mockedResponse = {
          data: {
            characters: [
              {
                title: 'Character',
                downloadURLs: ['http://example.com/image1.jpg'],
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
      }
    );

    await page.goto('/characters');

    // Wait for the 'Characters' heading to be visible
    await expect(
      page.getByRole('heading', { name: 'Characters' })
    ).toBeVisible();

    // Wait for a specific time to ensure characters are loaded
    await page.waitForTimeout(2000);

    // Check if characters are displayed using locator
    const character1 = page.locator('text=Character');

    await expect(character1).toBeVisible();
  });
});
