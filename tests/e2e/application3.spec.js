import { test, expect } from '@playwright/test';

test.describe('Shopping List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the shopping list elements', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Shopping List' })).toBeVisible();
    await expect(page.getByPlaceholder('Enter a new item')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Item' })).toBeVisible();
  });

  test('should add an item to the list', async ({ page }) => {
    await page.fill('#item-input', 'Milk');
    await page.click('#add-item-button');

    const listItem = page.getByText('Milk');
    await expect(listItem).toBeVisible();
  });

  test('should delete an item from the list', async ({ page }) => {
    await page.fill('#item-input', 'Bread');
    await page.click('#add-item-button');

    const deleteButton = page.getByRole('button', { name: 'Delete' });
    await deleteButton.click();

    await expect(page.getByText('Bread')).not.toBeVisible();
  });
});
