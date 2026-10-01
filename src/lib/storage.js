export const TASKS_KEY = 'todo.tasks'
export const FILTER_KEY = 'todo.filter'

const VALID_FILTERS = ['all', 'active', 'completed']

function isValidTask(t) {
  return (
    t != null &&
    typeof t.id === 'string' &&
    t.id.length > 0 &&
    typeof t.title === 'string' &&
    typeof t.completed === 'boolean' &&
    typeof t.createdAt === 'string'
  )
}

// タスク配列を読み込む。JSON パース失敗や不正な値の場合は空配列を返す(クラッシュしない)
export function loadTasks() {
  let raw
  try {
    raw = localStorage.getItem(TASKS_KEY)
  } catch {
    return []
  }
  if (raw == null) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isValidTask)
  } catch {
    // 不正な JSON → デフォルト値(空配列)にフォールバック
    return []
  }
}

// タスク配列を保存する。保存失敗(QuotaExceededError など)は呼び出し側で捕獲する
export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

// 現在のフィルタを読み込む。不正な値の場合は "all" を返す
export function loadFilter() {
  let raw
  try {
    raw = localStorage.getItem(FILTER_KEY)
  } catch {
    return 'all'
  }
  return VALID_FILTERS.includes(raw) ? raw : 'all'
}

// 現在のフィルタを保存する
export function saveFilter(filter) {
  localStorage.setItem(FILTER_KEY, filter)
}
