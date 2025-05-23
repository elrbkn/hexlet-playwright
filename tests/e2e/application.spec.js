import { test, expect } from '@playwright/test';

test('Register positive', async ({ page }) => {
  await page.goto('/');

  const nameInput = page.getByLabel('Имя пользователя');
  await expect(nameInput).toBeVisible();

  const passwordInput = page.getByLabel('Пароль');
  await expect(passwordInput).toBeVisible();

  const passwordConfirmInput = page.getByLabel('Подтверждение пароля');
  await expect(passwordConfirmInput).toBeVisible();

  const checkbox = page.getByLabel('Даю согласие на обработку персональных данных');
  await expect(checkbox).toBeVisible();

  const button = page.getByRole('button', { name: 'Зарегистрироваться' });
  await expect(button).toBeVisible();
});
