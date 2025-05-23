import { test, expect } from '@playwright/test';

const mainPageUrl = '/';

test.describe.serial( 'Products List', () => {
  
  test('succses', async ({ page }) => {
    await page.route(`${mainPageUrl}api/products`, async route => {
      const mockProducts = [
        { name: 'Test Product 1', price: 10 },
        { name: 'Test Product 2', price: 20 }
      ];

    await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProducts),
    });
    });
    await page.goto(mainPageUrl);

    await expect(page.getByText('Test Product 1 - $10')).toBeVisible();
    await expect(page.getByText('Test Product 2 - $20')).toBeVisible();
  });


  test('fail', async ({ page }) => {
    await page.route(`${mainPageUrl}api/products`, async route => {
      await route.fulfill({
        tatus: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' }),
      });
    });
    await page.goto(mainPageUrl);

    await expect(page.getByText('Failed to fetch')).toBeVisible();
  });
});
