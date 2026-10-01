import { test, expect } from '@playwright/test'

test('「/todo3/」ベースパスでページが表示される', async ({ page }) => {
  await page.goto('')

  await expect(page).toHaveTitle('ToDo')
  await expect(page.locator('h1')).toHaveText('ToDo')
})
