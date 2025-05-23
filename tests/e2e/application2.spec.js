import { test, expect } from '@playwright/test';

test.describe('Profile Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display profile fields', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Имя' })).toBeVisible();
    await expect(page.getByLabel('Дата рождения')).toBeVisible();
    await expect(page.getByLabel('Выберите предпочтение')).toBeVisible();
    await expect(page.getByLabel('Согласие с условиями')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Сохранить' })).toBeVisible();
  });

  test('should update profile successfully and reset form', async ({ page }) => {
    const nameField = page.getByRole('textbox', { name: 'Имя' });
    const birthdateField = page.getByLabel('Дата рождения');
    const preferenceSelect = page.getByLabel('Выберите предпочтение');
    const agreementCheckbox = page.getByLabel('Согласие с условиями');

    await nameField.fill('Иван Иванов');
    await birthdateField.fill('1990-01-01');
    await preferenceSelect.selectOption({ label: 'Хекслет' });
    await agreementCheckbox.check();

    await expect(nameField).toHaveValue('Иван Иванов');
    await expect(birthdateField).toHaveValue('1990-01-01');
    await expect(preferenceSelect).toHaveValue('hexlet');
    await expect(agreementCheckbox).toBeChecked();

    await page.getByRole('button', { name: 'Сохранить' }).click();

    await expect(nameField).toHaveValue('');
    await expect(birthdateField).toHaveValue('');
    await expect(preferenceSelect).toHaveValue('');
    await expect(agreementCheckbox).not.toBeChecked();
  });
});
