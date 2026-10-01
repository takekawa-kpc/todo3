import type { Page } from '@playwright/test'

// 入力欄にタイトルを入力し Enter で登録する
export async function addTask(page: Page, title: string) {
  const input = page.getByLabel('タスクタイトル')
  await input.fill(title)
  await input.press('Enter')
}
