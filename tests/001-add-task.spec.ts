import { test, expect } from '@playwright/test'

test('「追加」ボタンでタスクを登録できる', async ({ page }) => {
  await page.goto('')
  const input = page.getByLabel('タスクタイトル')
  await input.fill('牛乳を買う')
  await page.getByRole('button', { name: '追加' }).click()
  await expect(page.getByRole('listitem')).toContainText('牛乳を買う')
  await expect(input).toHaveValue('')
})

test('Enter キーで登録でき、登録後は空になりフォーカスが維持される', async ({ page }) => {
  await page.goto('')
  const input = page.getByLabel('タスクタイトル')
  await input.fill('レポートを書く')
  await input.press('Enter')
  await expect(page.getByRole('listitem')).toContainText('レポートを書く')
  await expect(input).toHaveValue('')
  await expect(input).toBeFocused()
})

test('空白のみのタイトルは登録されず、赤枠とエラーメッセージが表示される', async ({ page }) => {
  await page.goto('')
  const input = page.getByLabel('タスクタイトル')
  await input.fill('   ')
  await page.getByRole('button', { name: '追加' }).click()
  await expect(page.getByRole('listitem')).toHaveCount(0)
  await expect(page.getByText('タイトルを入力してください。')).toBeVisible()
  await expect(input).toHaveAttribute('aria-invalid', 'true')
})

test('エラー後、入力するとエラー表示がなくなる', async ({ page }) => {
  await page.goto('')
  const input = page.getByLabel('タスクタイトル')
  await input.fill('   ')
  await page.getByRole('button', { name: '追加' }).click()
  await expect(page.getByText('タイトルを入力してください。')).toBeVisible()
  await input.fill('新しいタスク')
  await expect(page.getByText('タイトルを入力してください。')).not.toBeVisible()
  await expect(input).not.toHaveAttribute('aria-invalid', 'true')
})

test('100 文字を超える文字は入力できない', async ({ page }) => {
  await page.goto('')
  const input = page.getByLabel('タスクタイトル')
  await input.pressSequentially('あ'.repeat(120))
  expect((await input.inputValue()).length).toBeLessThanOrEqual(100)
})

test('100 文字まで登録できる', async ({ page }) => {
  await page.goto('')
  const input = page.getByLabel('タスクタイトル')
  await input.pressSequentially('あ'.repeat(100))
  await input.press('Enter')
  await expect(page.getByRole('listitem')).toHaveCount(1)
})
