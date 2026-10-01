import { test, expect } from '@playwright/test'
import { addTask } from './helpers'

test('複数のタスクが新しい順に表示される', async ({ page }) => {
  await page.goto('')
  await addTask(page, '最初のタスク')
  await addTask(page, '二番目のタスク')
  await addTask(page, '三番目のタスク')

  const items = page.getByRole('listitem')
  await expect(items).toHaveCount(3)
  await expect(items.nth(0)).toContainText('三番目のタスク')
  await expect(items.nth(1)).toContainText('二番目のタスク')
  await expect(items.nth(2)).toContainText('最初のタスク')
})

test('タスクが 0 件のとき中央に空状態メッセージが表示される', async ({ page }) => {
  await page.goto('')
  await expect(page.getByText('タスクはまだありません')).toBeVisible()
})

test('全タスク削除後、Empty State が表示される', async ({ page }) => {
  await page.goto('')
  await addTask(page, '一時タスク')
  await expect(page.getByRole('listitem')).toHaveCount(1)
  await page.getByRole('button', { name: '削除: 一時タスク' }).click()
  await expect(page.getByRole('listitem')).toHaveCount(0)
  await expect(page.getByText('タスクはまだありません')).toBeVisible()
})

test('未完了件数と合計件数が正しく表示される', async ({ page }) => {
  await page.goto('')
  await addTask(page, 'タスクA')
  await addTask(page, 'タスクB')
  await addTask(page, 'タスクC')
  await expect(page.getByText('3 of 3 tasks left')).toBeVisible()
})

test('1 件完了すると未完了件数が更新される', async ({ page }) => {
  await page.goto('')
  await addTask(page, 'タスクA')
  await addTask(page, 'タスクB')
  await page.getByRole('checkbox', { name: '完了にする: タスクA' }).check()
  await expect(page.getByText('1 of 2 tasks left')).toBeVisible()
})

test('各タスクにタイトル・作成日時・完了ステータス(チェックボックス)が表示される', async ({ page }) => {
  await page.goto('')
  await addTask(page, '表示確認')
  const item = page.getByRole('listitem')
  await expect(item).toContainText('表示確認')
  await expect(item.locator('time[dateTime]')).toHaveCount(1)
  await expect(item.getByRole('checkbox')).toHaveCount(1)
})
