import { formatDateTime } from '../lib/format.js'

// 1 タスク: チェックボックス / タイトル / 作成日時 / 削除ボタン(✕)
export default function TaskItem({ task, deleting, onToggle, onDelete }) {
  return (
    <li
      className={`task-enter flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition-all duration-[180ms] ease-out dark:border-gray-800 dark:bg-gray-900
        ${deleting ? '-translate-x-2 opacity-0' : ''}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`完了にする: ${task.title}`}
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-indigo-600"
      />
      <div className="min-w-0 flex-1">
        <p
          className={`break-words text-base transition-colors duration-200
            ${
              task.completed
                ? 'text-gray-400 line-through dark:text-gray-500'
                : 'text-gray-900 dark:text-gray-100'
            }`}
        >
          {task.title}
        </p>
        <time
          dateTime={task.createdAt}
          className="text-sm text-gray-400 dark:text-gray-500"
        >
          {formatDateTime(task.createdAt)}
        </time>
      </div>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`削除: ${task.title}`}
        className="shrink-0 rounded-md p-1 text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400"
      >
        <span aria-hidden="true">✕</span>
      </button>
    </li>
  )
}
