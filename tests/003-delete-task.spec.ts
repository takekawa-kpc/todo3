import { test, expect } from '@playwright/test'
import { addTask } from './helpers'

test('削除ボタン(✕)で対象タスクが即時削除される', async ({ page }) => {
  await page.goto('')
  await addTask(page, '削除するタスク')
  await expect(page.getByRole('listitem')).toHaveCount(1)
  await page.getByRole('button', { name: '削除: 削除するタスク' }).click()
  await expect(page.getByRole('listitem')).toHaveCount(0)
  await expect(page.getByRole('button', { name: '削除: 削除するタスク' })).toHaveCount(0)
})

test('確認ダイアログなしで即削除される', async ({ page }) => {
  const dialogs: string[] = []
  page.on('dialog', (dialog) => {
    dialogs.push(dialog.message())
    dialog.dismiss().catch(() => {})
  })
  await page.goto('')
  await addTask(page, 'ダイアログ確認')
  await page.getByRole('button', { name: '削除: ダイアログ確認' }).click()
  await expect(page.getByRole('listitem')).toHaveCount(0)
  expect(dialogs).toHaveLength(0)
})

test('複数のタスクから 1 件だけ削除できる', async ({ page }) => {
  await page.goto('')
  await addTask(page, '残すタスク')
  await addTask(page, '消すタスク')
  await expect(page.getByRole('listitem')).toHaveCount(2)
  await page.getByRole('button', { name: '削除: 消すタスク' }).click()
  await expect(page.getByRole('listitem')).toHaveCount(1)
  await expect(page.getByRole('listitem')).toContainText('残すタスク')
})

test('削除はリロード後も保持される', async ({ page }) => {
  await page.goto('')
  await addTask(page, '残すタスク')
  await addTask(page, '消すタスク')
  await page.getByRole('button', { name: '削除: 消すタスク' }).click()
  await expect(page.getByRole('listitem')).toHaveCount(1)

  await page.reload()
  await expect(page.getByRole('listitem')).toHaveCount(1)
  await expect(page.getByRole('listitem')).toContainText('残すタスク')
})
