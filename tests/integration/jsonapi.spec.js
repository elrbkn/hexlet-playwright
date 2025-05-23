import test, { expect } from '@playwright/test'

test('tasks/:id', async ({ request }) => {
  const postId = '1'

  const response = await request.get(
    `https://http.hexlet.app/js-playwright/post/${postId}`,
  )

  expect(response.ok()).toBeTruthy()

  const data = await response.json()
    expect(data).toMatchObject(
    expect.objectContaining({
      id: postId,
    }),
  )
})

test('posts', async ({ request }) => {
  const data = {
    title: 'Пройти курс',
    description: 'Пройти курс по плейрайту за месяц',
    id: 10,
  }
  const response = await request.post('https://http.hexlet.app/js-playwright/tasks', {
    data,
  })

  expect(response.status()).toBe(201)

  const responseData = await response.json()
  expect(data).toMatchObject(expect.objectContaining(data))
})
