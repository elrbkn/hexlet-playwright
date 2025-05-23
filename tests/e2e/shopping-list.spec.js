import { test, expect } from '@playwright/test'
import ShoppingListMVCPage from './shopping-list-POP.js'

test('should add and delete items', async ({ page }) => {
  const shopPage = new ShoppingListMVCPage(page);
  await shopPage.goto();

  const firstItemName = 'milk';
  const secondItemName = 'eggs';

  await shopPage.addItem(firstItemName);
  await shopPage.addItem(secondItemName);

  const firstItem = shopPage.getTaskItemByName(firstItemName);
  const secondItem = shopPage.getTaskItemByName(secondItemName);

  await expect(firstItem).toBeVisible();
  await expect(secondItem).toBeVisible();

  await shopPage.deleteItem(firstItemName);

  await expect(firstItem).not.toBeVisible();
  await expect(secondItem).toBeVisible();
});
