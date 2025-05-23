import test from '@playwright/test'
import { allure } from 'allure-playwright'

test('Example test', async ({ page }) => {
  await allure.step('Открытие главной страницы', async () => {
    await page.goto('https://demo.playwright.dev/todomvc/')
  })

  await allure.step('Проверка заголовка', async () => {
    const title = await page.title()
    test.expect(title).toBe('Example Domain')
  })
})

import * as allure from 'allure-js-commons'
import { ContentType } from 'allure-js-commons'

test('Какой-то тест', async () => {
  // ...

  await allure.attachmentPath('Screenshot', '/path/to/image.png', {
    contentType: ContentType.PNG,
    fileExtension: 'png',
  })

  // Можно даже сохранять текстовые файлы
  await allure.attachment('Текстовый файл', 'Содержимое', ContentType.TEXT)
})
