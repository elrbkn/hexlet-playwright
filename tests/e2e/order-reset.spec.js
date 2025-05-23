import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, request }) => {

  const fillByLabel = async (page, labelText, value) => {
    const input = page.getByLabel(labelText);
    await input.fill(value.toString());
  };

  const userData = {
    username: 'username',
    password: 'password',
  };

  await request.post('/api/reset') 

  await page.goto('/');

  await page.getByRole('button', { name: 'Войти' }).click();
  await page.getByRole('link', { name: 'Регистрация' }).click();

  await fillByLabel(page, 'Логин пользователя', userData.username);
  await fillByLabel(page, /^Пароль$/, userData.password);
  await fillByLabel(page, 'Подтвердите пароль', userData.password);
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

  await expect(page.getByRole('button', { name: 'Выйти' })).toBeVisible(); 

});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Success order 1', async ({ page }) => {
  const item = { name: 'Автомобиль', price: 999999 };
  await page.getByRole('row').filter({ hasText: item.name }).getByRole('button', { name: 'Заказать' }).click();
  await page.getByRole('button', { name: 'Оформить заказ' }).click();
  await page.getByRole('button', { name: 'Заказы' }).click();
  await page.getByRole('row').filter({ hasText: item.price }).getByRole('button', { name: 'Подробнее' }).click();
  const row = page.getByRole('row', { name: 'Автомобиль 999999' });
  await expect(row).toBeVisible();
});

test('Success order 2', async ({ page }) => {
  const item = { name: 'Компьютер', price: 25000, count: 2 };
  await page.getByRole('row').filter({ hasText: item.name }).getByRole('button', { name: 'Заказать' }).click();
  await fillByLabel(page, 'Какое количество вы хотите добавить?', 2);
  await page.getByRole('button', { name: 'Оформить заказ' }).click();
  await page.getByRole('button', { name: 'Заказы' }).click();
  await page.getByRole('row').filter({ hasText: item.price * item.count }).getByRole('button', { name: 'Подробнее' }).click();
  const row = page.getByRole('row', { name: `${item.name} ${item.price}` });
  await expect(row).toBeVisible();
});
