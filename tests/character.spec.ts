import { test, expect, type Page, type Route } from '@playwright/test';

test.describe('Characters Page', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    // Intercept the API call and provide a mock response
    await page.route('**/graphql', async (route: Route) => {
      console.log('Intercepting GraphQL request');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            characters: [
              {
                title: 'Character 1',
                downloadURLs: ['http://example.com/character1.jpg'],
              },
              {
                title: 'Character 2',
                downloadURLs: ['http://example.com/character2.jpg'],
              },
            ],
          },
        }),
      });
    });
  });

  test('should display a list of characters', async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.goto('/characters');

    // Check if the page title is correct
    const header = page.locator('h2', { hasText: 'Characters' });
    await expect(header).toBeVisible();

    // Check if the character list is displayed
    const characterCards = page.locator('.card .link');
    await expect(characterCards).toHaveCount(2); // Expecting 2 characters from the mock

    // Verify each character card has a title and optionally an image
    const characterCount = await characterCards.count();
    for (let i = 0; i < characterCount; i++) {
      const card = characterCards.nth(i);
      await expect(card.locator('h2')).toBeVisible();

      const image = card.locator('img');
      const imageCount = await image.count();
      if (imageCount > 0) {
        await expect(image).toBeVisible();
        await expect(image).toHaveAttribute('src', /http/);
      } else {
        await expect(card.locator('p')).toHaveText('No image available.');
      }
    }
  });

  test('should navigate to character details page on click', async ({
    page,
  }: {
    page: Page;
  }) => {
    await page.goto('/characters');

    // Wait for the character list to load
    const characterCards = page.locator('.card .link');
    await expect(characterCards).toHaveCount(2);

    // Click the first character card
    const firstCharacterCard = characterCards.first();
    await firstCharacterCard.click();

    // Verify navigation by checking the new URL
    const url = page.url();
    expect(url).toMatch(/\/characters\/.+/);

    // Check if the character details page has content
    const characterTitle = await firstCharacterCard.locator('h2').textContent();
    await expect(page.locator('h1')).toHaveText(
      characterTitle as unknown as string
    );
  });
});
