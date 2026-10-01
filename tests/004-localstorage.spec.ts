import { test, expect } from '@playwright/test'
import { addTask } from './helpers'

test('追加したタスクはリロード後も保持される', async ({ page }) => {
  await page.goto('')
  await addTask(page, '保持されるタスク')
  await page.reload()
  await expect(page.getByRole('listitem')).toContainText('保持されるタスク')
})

test('完了切替はリロード後も保持される', async ({ page }) => {
  await page.goto('')
  await addTask(page, '切替テスト')
  await page.getByRole('checkbox', { name: '完了にする: 切替テスト' }).check()

  await page.reload()
  const checkbox = page.getByRole('checkbox', { name: '完了にする: 切替テスト' })
  await expect(checkbox).toBeChecked()
})

test('フィルタ切替はリロード後も保持される', async ({ page }) => {
  await page.goto('')
  await addTask(page, 'タスクA')
  await addTask(page, 'タスクB')
  await page.getByRole('button', { name: '未完了' }).click()

  await page.reload()
  await expect(page.getByRole('button', { name: '未完了' })).toHaveAttribute('aria-pressed', 'true')
})

test('todo.tasks / todo.filter に正しい形式で保存される', async ({ page }) => {
  await page.goto('')
  await addTask(page, 'データ構造確認')
  await page.getByRole('checkbox', { name: '完了にする: データ構造確認' }).check()
  await page.getByRole('button', { name: '完了済み' }).click()

  const tasks = await page.evaluate(() => JSON.parse(localStorage.getItem('todo.tasks') ?? '[]'))
  expect(tasks).toHaveLength(1)
  expect(tasks[0]).toMatchObject({
    title: 'データ構造確認',
    completed: true,
  })
  expect(typeof tasks[0].id).toBe('string')
  expect(typeof tasks[0].createdAt).toBe('string')
  expect(() => new Date(tasks[0].createdAt)).not.toThrow()

  const filter = await page.evaluate(() => localStorage.getItem('todo.filter'))
  expect(filter).toBe('completed')
})

test('localStorage に不正 JSON を入れてもアプリが起動し、空状態から使える', async ({ page }) => {
  await page.goto('')
  await page.evaluate(() => {
    localStorage.setItem('todo.tasks', 'これは不正な JSON{{{')
  })
  await page.reload()

  await expect(page.getByText('タスクはまだありません')).toBeVisible()
  await expect(page.getByRole('listitem')).toHaveCount(0)

  // 空状態から新規追加できる
  await addTask(page, '回復したタスク')
  await expect(page.getByRole('listitem')).toContainText('回復したタスク')
})

test('todo.tasks が配列でなかった場合は空配列にフォールバックする', async ({ page }) => {
  await page.goto('')
  await page.evaluate(() => {
    localStorage.setItem('todo.tasks', '{"not":"an array"}')
  })
  await page.reload()
  await expect(page.getByText('タスクはまだありません')).toBeVisible()
})

test('保存失敗シミュレーションで警告バナーが表示される', async ({ page }) => {
  // localStorage.setItem を例外を投げるよう差し替えて保存失敗を再現する
  // todo.* キーの保存のみ失敗させる(アプリ以外のストレージには影響しない)
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem
    Object.defineProperty(Storage.prototype, 'setItem', {
      value: function (key: string, value: string) {
        if (typeof key === 'string' && key.startsWith('todo.')) {
          throw new Error('QuotaExceededError (simulated)')
        }
        return original.call(this, key, value)
      },
      configurable: true,
    })
  })

  await page.goto('')
  await addTask(page, '保存失敗タスク')

  const banner = page.getByRole('alert')
  await expect(banner).toBeVisible()
  await expect(banner).toContainText('保存に失敗しました')
})

test('警告バナーは 5 秒後に自動で消える', async ({ page }) => {
  // todo.* キーの保存のみ失敗させる(アプリ以外のストレージには影響しない)
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem
    Object.defineProperty(Storage.prototype, 'setItem', {
      value: function (key: string, value: string) {
        if (typeof key === 'string' && key.startsWith('todo.')) {
          throw new Error('QuotaExceededError (simulated)')
        }
        return original.call(this, key, value)
      },
      configurable: true,
    })
  })

  await page.goto('')
  await addTask(page, 'バナー消去テスト')
  const banner = page.getByRole('alert')
  await expect(banner).toBeVisible()

  // 5 秒 + 余裕を持って待ってから消えていることを確認
  await expect(banner).toBeHidden({ timeout: 8000 })
})
