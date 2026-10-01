import { useRef, useState } from 'react'

const MAX_LENGTH = 100

// 入力欄と「追加」ボタン(Enter / ボタンで登録、登録後は空にしてフォーカス維持)
export default function TaskForm({ onAdd }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  function submit(e) {
    e.preventDefault()
    const title = value.trim()
    if (!title) {
      setError('タイトルを入力してください。')
      inputRef.current?.focus()
      return
    }
    onAdd(title)
    setValue('')
    setError('')
    inputRef.current?.focus()
  }

  function handleChange(e) {
    setValue(e.target.value)
    if (error) setError('')
  }

  const invalid = error !== ''

  return (
    <form onSubmit={submit} noValidate className="space-y-2">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          maxLength={MAX_LENGTH}
          onChange={handleChange}
          placeholder="やることを入力…"
          aria-label="タスクタイトル"
          aria-invalid={invalid}
          aria-describedby={invalid ? 'task-input-error' : undefined}
          className={`min-w-0 flex-1 rounded-lg border bg-white px-3 py-2 text-base text-gray-900 outline-none transition-colors duration-200 placeholder:text-gray-400 dark:bg-gray-900 dark:text-gray-100
            ${
              invalid
                ? 'border-red-500 ring-2 ring-red-500/30'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-gray-700'
            }`}
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-base font-medium text-white transition-colors duration-200 hover:bg-indigo-500 active:bg-indigo-700"
        >
          追加
        </button>
      </div>
      {invalid && (
        <p
          id="task-input-error"
          role="alert"
          className="text-base font-medium text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </form>
  )
}
