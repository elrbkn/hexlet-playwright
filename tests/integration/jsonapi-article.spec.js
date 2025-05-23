import { test, expect } from '@playwright/test'

test('articles/id:1', async ({ request }) => {
  const articleID = '1';
  const response = await request.get(`../articles/${articleID}`);

  expect(response.ok()).toBeTruthy();

  const data = await response.json();

  expect(data).toMatchObject({
    id: "1",
    title: "a title",
    views: 100,
  });
});
