import { useEffect, useMemo, useState } from 'react'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import FilterBar from './components/FilterBar.jsx'
import EmptyState from './components/EmptyState.jsx'
import StorageBanner from './components/StorageBanner.jsx'
import { loadTasks, loadFilter, saveTasks, saveFilter } from './lib/storage.js'
import { uuid } from './lib/ids.js'

const DELETE_ANIMATION_MS = 180
const BANNER_DURATION_MS = 5000

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [filter, setFilter] = useState(() => loadFilter())
  const [storageError, setStorageError] = useState(false)
  const [deletingIds, setDeletingIds] = useState(() => new Set())

  // タスクを localStorage に永続化する(保存失敗時は警告バナーを表示)
  useEffect(() => {
    try {
      saveTasks(tasks)
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }, [tasks])

  // フィルタを localStorage に永続化する
  useEffect(() => {
    try {
      saveFilter(filter)
    } catch {
      // フィルタの保存失敗はバナー対象外
    }
  }, [filter])

  // 警告バナーは 5 秒間表示して自動的に消す
  useEffect(() => {
    if (!storageError) return undefined
    const t = setTimeout(() => setStorageError(false), BANNER_DURATION_MS)
    return () => clearTimeout(t)
  }, [storageError])

  // 作成日時の新しい順に並び替えた表示タスク
  const visibleTasks = useMemo(() => {
    const sorted = [...tasks].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    if (filter === 'active') return sorted.filter((t) => !t.completed)
    if (filter === 'completed') return sorted.filter((t) => t.completed)
    return sorted
  }, [tasks, filter])

  const total = tasks.length
  const remaining = useMemo(() => tasks.filter((t) => !t.completed).length, [tasks])

  function addTask(title) {
    const task = {
      id: uuid(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [task, ...prev])
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  // 短いトランジション(180ms)を再生してから実際に削除する
  function requestDelete(id) {
    setDeletingIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id))
      setDeletingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, DELETE_ANIMATION_MS)
  }

  return (
    <>
      <StorageBanner visible={storageError} />
      <main className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <div className="h-full w-full max-w-[480px] rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">ToDo</h1>
          <div className="mt-5 space-y-4">
            <TaskForm onAdd={addTask} />
            <FilterBar filter={filter} onChange={setFilter} />
            {total === 0 ? (
              <EmptyState message="タスクはまだありません" />
            ) : visibleTasks.length === 0 ? (
              <EmptyState message="該当するタスクがありません" />
            ) : (
              <TaskList
                tasks={visibleTasks}
                deletingIds={deletingIds}
                onToggle={toggleTask}
                onDelete={requestDelete}
              />
            )}
            <footer className="flex justify-end text-base text-gray-500 dark:text-gray-400">
              <span>
                {remaining} of {total} tasks left
              </span>
            </footer>
          </div>
        </div>
      </main>
    </>
  )
}
