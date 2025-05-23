import { test, expect } from '@playwright/test';

export const fillByLabel = async (page, labelText, value) => {
  const input = page.getByLabel(labelText);
  await input.fill(value.toString());
};

export const userData = {
  username: 'username',
  password: 'password',
};

test.describe('internet shop', () => {

  test.beforeEach('open link', async ({ page }) => {
    await page.goto('/');
  });

  test.beforeEach('authorization', async ({ page }) => {
    const enterButton = page.getByRole('button', { name: 'Войти' });

    await enterButton.click();

    await fillByLabel(page, 'Ваш логин', userData.username);
    await fillByLabel(page, 'Пароль', userData.password);

    const sendButton = page.getByRole('button', {name: 'Отправить'});
    await sendButton.click();

    const exitButton = page.getByRole('button', {name: 'Выйти'});
    const ordersButton = page.getByRole('button', {name: 'Заказы'});

    await expect(exitButton).toBeVisible();
    await expect(ordersButton).toBeVisible();
    await expect(enterButton).not.toBeVisible();
  })

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('make order', async ({ page }) => {

    const orderItemByName = async (name) => {
      const item = page.locator('tr', { hasText: name });
      const ordersButton = item.getByRole('button', { name: 'Заказать' });
      await ordersButton.click();
    }

    await orderItemByName('Автомобиль');
    let  approveButton = page.getByRole('button', {name: 'Оформить заказ'});
    await approveButton.click();

    await orderItemByName('Носки');
    const inputQuantity = page.getByLabel('Какое количество вы хотите добавить?');
    await inputQuantity.press('ArrowUp');
    approveButton = page.getByRole('button', {name: 'Оформить заказ'});
    await approveButton.click();

    const ordersButton = page.getByRole('button', {name: 'Заказы'});
    await ordersButton.click();

    const orderRow1 = page.locator('tr', { hasText: '999999' });
    await expect(orderRow1.getByRole('button', { name: 'Подробнее' })).toBeVisible();

    const orderRow2 = page.locator('tr', { hasText: '100' });
    await expect(orderRow2.getByRole('button', { name: 'Подробнее' })).toBeVisible();
    });
});
