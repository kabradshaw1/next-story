import { test, expect, type Page, type Route } from '@playwright/test';

test.describe('Characters Page', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    console.log('NEXT_PUBLIC_STORY_URL:', process.env.NEXT_PUBLIC_STORY_URL);

    const graphqlEndpoint = `${process.env.NEXT_PUBLIC_STORY_URL}/graphql`;
    console.log('Intercepting endpoint:', graphqlEndpoint);

    await page.route(graphqlEndpoint, async (route: Route) => {
      console.log('Intercepting GraphQL request:', route.request().url());
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
      console.log('Mock response applied');
    });

    page.on('request', (request) => {
      console.log('>>', request.method(), request.url());
    });
    page.on('response', (response) => {
      console.log('<<', response.status(), response.url());
    });

    await page.goto('/characters');

    // Ensure the page is in a clean state before running each test
    await page.evaluate(() => {
      document.querySelectorAll('.card .link').forEach((node) => node.remove());
    });

    await page.waitForTimeout(5000); // Increased wait time for rendering
  });

  test('should display a list of characters', async ({
    page,
  }: {
    page: Page;
  }) => {
    // Log page content for debugging
    const content = await page.content();
    console.log('Page content:', content);

    const characterCards = page.locator('.card .link');
    await expect(characterCards).toHaveCount(2); // Expecting 2 characters from the mock

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
    const characterCards = page.locator('.card .link');
    await expect(characterCards).toHaveCount(2);

    const firstCharacterCard = characterCards.first();
    await firstCharacterCard.click();

    const url = page.url();
    expect(url).toMatch(/\/characters\/.+/);

    const characterTitle = await firstCharacterCard.locator('h2').textContent();
    await expect(page.locator('h1')).toHaveText(
      characterTitle as unknown as string
    );
  });
});
